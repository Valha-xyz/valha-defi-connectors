// const { type Chain } = require('../../../../utils/types/networks')
const { queryMorphoGraphData, SUBGRAPH_URL} =require('./external/graph_query')
import { getGeckoTokenPrice } from '../../../../utils/prices/getGeckoTokenPrice'

async function analytics (chain,poolAddress) {

 // Defined variables
 const BLOCKS_PER_DAY = 7200;
 const SECONDS_PER_DAY = 3600 * 24;
 const apxBlockSpeedInSeconds = 12; // in 1e4 units
 const compToken = '0xc00e94cb662c3520282e6f5717214004a7f26888'.toLowerCase();

  // Defined functions
 const rateToAPY = (ratePerYear) => Math.pow(1 + ratePerYear , 365) - 1;

 const computeCompRewardsAPY = (marketFromGraph, compPrice, supply) => {
  const poolCompSpeed = supply
    ? +marketFromGraph.reserveData.supplySpeeds / 1e18
    : +marketFromGraph.reserveData.borrowSpeeds / 1e18;
  const compDistributedEachDays =
    (poolCompSpeed * SECONDS_PER_DAY) / apxBlockSpeedInSeconds;

  const price =
    marketFromGraph.reserveData.usd /
    Math.pow(10, 18 * 2 - marketFromGraph.token.decimals);
  const totalPoolUsd = supply
    ? ((marketFromGraph.metrics.totalSupplyOnPool *
        marketFromGraph.reserveData.supplyPoolIndex) /
        Math.pow(10, 18 + marketFromGraph.token.decimals)) *
      price
    : ((marketFromGraph.metrics.totalBorrowOnPool *
        marketFromGraph.reserveData.borrowPoolIndex) /
        Math.pow(10, 18 + marketFromGraph.token.decimals)) *
      price;
  const compRate = (compDistributedEachDays * compPrice) / totalPoolUsd;
  return rateToAPY(compRate);
};

  //import the correctData
  const allPoolInfo = await queryMorphoGraphData();
  
  const compMarket = allPoolInfo.find((market) => market.token.address === compToken);
  const compPrice = compMarket.reserveData.usd / 1e18;

  // We get the current pool inside this big array
  const currentPoolInfo = allPoolInfo.find(market => market.address.toLowerCase() == poolAddress.toLowerCase());
  
  // token price
  const underlyingTokenAddress = currentPoolInfo.token.address
  // const { data, err } = await getGeckoTokenPrice(
  //   chain,underlyingTokenAddress)
  // if (err) throw new Error(err.message)
  // const tokenPrice = data

  // supplied amount which is waiting to be matched
  const totalSupplyOnPool = +currentPoolInfo.metrics.supplyBalanceOnPool*
        +currentPoolInfo.reserveData.supplyPoolIndex / (10 ** ( 18 + currentPoolInfo.token.decimals)) ;
  

   // supplied amount which is matched p2p
   const totalSupplyP2P =
   (+currentPoolInfo.metrics.supplyBalanceInP2P *
     +currentPoolInfo.p2pData.p2pSupplyIndex) / (10 ** (18 + currentPoolInfo.token.decimals)) ;
   

 // borrowed amount from underlying aave pool
 const totalBorrowOnPool =
   (+currentPoolInfo.metrics.borrowBalanceOnPool *
     +currentPoolInfo.reserveData.borrowPoolIndex) / (10 ** (18 + currentPoolInfo.token.decimals)) ;
   

 // borrowed amount which is matched p2p
 const totalBorrowP2P =
   (+currentPoolInfo.metrics.borrowBalanceInP2P *
     +currentPoolInfo.p2pData.p2pBorrowIndex) / (10 ** (18 + currentPoolInfo.token.decimals)) ;
   
 const totalSupply = totalSupplyOnPool + totalSupplyP2P;
 const totalBorrow = totalBorrowOnPool + totalBorrowP2P;

 // in morpho's case we use total supply as tvl instead of available liq (cause borrow on morpho can be greater than supply (delta is routed to underlying aave pool)
    const totalSupplyUsd =
       ((totalSupply) * (currentPoolInfo.reserveData.usd / (10 ** (18 * 2 - currentPoolInfo.token.decimals))));
    const totalBorrowUsd =
       ((totalBorrow) * (currentPoolInfo.reserveData.usd / (10 ** (18 * 2 - currentPoolInfo.token.decimals))));
    
    // aave base apy's
    const poolSupplyAPY = rateToAPY(
      (+currentPoolInfo.reserveData.supplyPoolRate / 1e18)*BLOCKS_PER_DAY
    );

    const poolBorrowAPY = rateToAPY(
      (+currentPoolInfo.reserveData.borrowPoolRate / 1e18)*BLOCKS_PER_DAY
    );

    const spread = poolBorrowAPY - poolSupplyAPY;

    // p2pSupplyAPY = morpho p2p apy
    const p2pIndexCursor = +currentPoolInfo.p2pIndexCursor / 1e4;
    const p2pSupplyAPY = poolSupplyAPY + spread * p2pIndexCursor;


    const avgSupplyAPY =
      totalSupply === 0
        ? 0
        : ((totalSupplyOnPool * poolSupplyAPY + totalSupplyP2P * p2pSupplyAPY) *
            100) /
          totalSupply;

    const compAPY = computeCompRewardsAPY(currentPoolInfo, compPrice, true);

    // Morpho redistributes comp rewards to users on Pool
    const avgCompSupplyAPY =
      totalSupply === 0 ? 0 : (compAPY * totalSupplyOnPool * 100) / totalSupply;
    
    // some of the markets on compound have higher apy (base + reward) than the p2p apy
    // on morpho. in such cases -> display the compound rates
    const conditionBase = (poolSupplyAPY + compAPY) * 100 > avgSupplyAPY;
    const apyBase = conditionBase ? poolSupplyAPY * 100 : avgSupplyAPY;
    const apyReward = conditionBase ? compAPY * 100 : 0;

  const result = {
    status: null,
    tvl: totalSupplyUsd,
    liquidity: totalSupplyUsd,
    outloans: totalBorrowUsd,
    losses: null,
    capacity: null,
    apy: apyBase + apyReward,
    activity_apy: apyBase,
    rewards_apy: apyReward,
    boosting_apy: 0,
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null
  }

  console.log(result)

  return result
}

module.exports = {
  main: analytics,
  url: SUBGRAPH_URL
}
