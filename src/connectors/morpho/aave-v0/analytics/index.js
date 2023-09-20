// const { type Chain } = require('../../../../utils/types/networks')
const { queryMorphoGraphData } = require('./external/graph_query');
const pools = require('../pools/pools');
const _ = require('lodash');
import { getGeckoTokenPrice } from '../../../../utils/prices/getGeckoTokenPrice';

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });

  const SECONDS_PER_YEAR = 3600 * 24 * 365;

  const rateToAPY = (ratePerYear) =>
    Math.pow(1 + ratePerYear / SECONDS_PER_YEAR, SECONDS_PER_YEAR) - 1;

  //import the correctData
  const allPoolInfo = await queryMorphoGraphData();

  // We get the current pool inside this big array
  const currentPoolInfo = allPoolInfo.find(
    (market) =>
      market.address.toLowerCase() ==
      poolInfo.metadata.protocolToken.toLowerCase(),
  );

  const ethPrice = currentPoolInfo.reserveData.eth / 1e18;

  // token price
  const underlyingTokenAddress = currentPoolInfo.token.address;
  const { data, err } = await getGeckoTokenPrice(chain, underlyingTokenAddress);
  if (err) throw new Error(err.message);
  const tokenPrice = data;

  // supplied amount which is waiting to be matched
  const totalSupplyOnPool =
    (+currentPoolInfo.metrics.supplyBalanceOnPool *
      +currentPoolInfo.reserveData.supplyPoolIndex) /
    10 ** (27 + currentPoolInfo.token.decimals);

  // supplied amount which is matched p2p
  const totalSupplyP2P =
    (+currentPoolInfo.metrics.supplyBalanceInP2P *
      +currentPoolInfo.p2pData.p2pSupplyIndex) /
    10 ** (27 + currentPoolInfo.token.decimals);

  // borrowed amount from underlying aave pool
  const totalBorrowOnPool =
    (+currentPoolInfo.metrics.borrowBalanceOnPool *
      +currentPoolInfo.reserveData.borrowPoolIndex) /
    10 ** (27 + currentPoolInfo.token.decimals);

  // borrowed amount which is matched p2p
  const totalBorrowP2P =
    (+currentPoolInfo.metrics.borrowBalanceInP2P *
      +currentPoolInfo.p2pData.p2pBorrowIndex) /
    10 ** (27 + currentPoolInfo.token.decimals);

  const totalSupply = totalSupplyOnPool + totalSupplyP2P;
  const totalBorrow = totalBorrowOnPool + totalBorrowP2P;

  // in morpho's case we use total supply as tvl instead of available liq (cause borrow on morpho can be greater than supply (delta is routed to underlying aave pool)
  const totalSupplyUsd =
    (tokenPrice * (totalSupply * (currentPoolInfo.reserveData.eth / 1e18))) /
    ethPrice;
  const totalBorrowUsd =
    (tokenPrice * (totalBorrow * (currentPoolInfo.reserveData.eth / 1e18))) /
    ethPrice;

  // aave base apy's
  const poolSupplyAPY = rateToAPY(
    +currentPoolInfo.reserveData.supplyPoolRate / 1e27,
  );

  const poolBorrowAPY = rateToAPY(
    +currentPoolInfo.reserveData.borrowPoolRate / 1e27,
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

  const result = {
    status: null,
    tvl: totalSupplyUsd,
    liquidity: totalSupplyUsd,
    outloans: totalBorrowUsd,
    losses: null,
    capacity: null,
    apy: avgSupplyAPY,
    activity_apy: avgSupplyAPY,
    rewards_apy: 0,
    boosting_apy: 0,
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://morpho.best/',
};
