/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
const pools = require('../../pools/pools');
const axios = require('axios');


async function checkTraderJoeApy(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const exchange = poolInfo.metadata.exchange;

    // ACTIVITY APY COMPUTATION 


    // REWARDS APY COMPUTATION 

    return {
      data: {
        activity_apy: 0,
        rewards_apy: 0,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkTraderJoeApy;
