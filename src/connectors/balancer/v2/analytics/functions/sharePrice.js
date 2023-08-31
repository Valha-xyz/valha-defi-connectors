/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const {queryGraphData, getBlocksByTime} = require ('./external/graphQuery');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const pools = require('../../pools/pools');
import { SUBGRAPH_URLS, GAUGE_URLS} from './external/graphQuery'




async function checkBalancerV2SharePrice(chain, poolAddress) {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const currentTimestamp = Math.floor(Date.now() / 1000) - 100;

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    const underlyingTokens = poolInfo.underlying_tokens;

    // We get the current pool inside this big array
    const TVL = Number(query[0].totalLiquidity);
    const totalShares = Number(query[0].totalShares);


    // initialise tokens balances and weights
    let balanceToken2;
    let balanceToken3;
    let weightToken2;
    let weightToken3;
    let sharePrice0;
    let sharePrice1;
    let sharePrice2;
    let sharePrice3;


    // always a two-sided pool at least
    const balanceToken0 = Number(query[0].tokens[0].balance);
    const balanceToken1 = Number(query[0].tokens[1].balance);
    const weightToken0 = Number(query[0].tokens[0].weight);
    const weightToken1 = Number(query[0].tokens[1].balance);

    

    if (underlyingTokens.length === 2){
      sharePrice2 = 0;
      sharePrice3 = 0;
      if (weightToken0 === 0){
        sharePrice0 = 2 * balanceToken0/totalShares;
        sharePrice1 = 2 * balanceToken1/totalShares; 
      } else {
        sharePrice0 = (1/weightToken0) * balanceToken0/totalShares;
        sharePrice1 = (1/weightToken1) * balanceToken1/totalShares;
      }
    }
    if (underlyingTokens.length === 3){
      sharePrice3 = 0;
      balanceToken2 = Number(query[0].tokens[2].balance);
      if (weightToken0 === 0){
        sharePrice0 = 3 * balanceToken0/totalShares;
        sharePrice1 = 3 * balanceToken1/totalShares;  
        sharePrice2 = 3 * balanceToken2/totalShares;  
      } else {
        sharePrice0 = (1/weightToken0) * balanceToken0/totalShares;
        sharePrice1 = (1/weightToken1) * balanceToken1/totalShares;
        sharePrice2 = (1/weightToken2) * balanceToken2/totalShares;
      }


    }
    if (underlyingTokens.length === 4){
      balanceToken2 = Number(query[0].tokens[2].balance);
      balanceToken3 = Number(query[0].tokens[3].balance);
      if (weightToken0 === 0){
        sharePrice0 = 4 * balanceToken0/totalShares;
        sharePrice1 = 4 * balanceToken1/totalShares;  
        sharePrice2 = 4 * balanceToken2/totalShares; 
        sharePrice3 = 4 * balanceToken3/totalShares; 
      } else {
        sharePrice0 = (1/weightToken0) * balanceToken0/totalShares;
        sharePrice1 = (1/weightToken1) * balanceToken1/totalShares;
        sharePrice2 = (1/weightToken2) * balanceToken2/totalShares;
        sharePrice3 = (1/weightToken3) * balanceToken2/totalShares;
      }
    }

    const share_price = { sharePriceUSD: TVL/totalShares, sharePriceToken0: sharePrice0, 
    sharePriceToken1 :sharePrice1, sharePriceToken2: sharePrice2, sharePriceToken3: sharePrice3, totalShares: totalShares };

    return { data: share_price, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBalancerV2SharePrice;
