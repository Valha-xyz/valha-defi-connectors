/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
const pools = require('../../pools/pools');
const axios = require('axios');

const EXCHANGES_API = {
  uniswapv3: '',
  quickswap: 'quickswap/',
  zyberswap: 'zyberswap/',
  thena: 'thena/',
  retro: 'retro/',
  camelot: 'camelot/',
  ramses: 'ramses/',
  sushiswap: 'sushi/',
  beamswap: 'beamswap/',
  stellaswap: 'stellaswap/'
};

function getUrl_allData(chain, exchange) {
  return `https://wire2.gamma.xyz/${exchange}${chain}/hypervisors/allData`;
}

function getUrl_allRewards2(chain, exchange) {
  return `https://wire2.gamma.xyz/${exchange}${chain}/allRewards2`;
}
   

function getAprRewardByAddress(jsonData, targetAddress) {
    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key) && jsonData[key].pools.hasOwnProperty(targetAddress)) {
        return jsonData[key].pools[targetAddress].apr;
      }
    }
    return null; // Address not found
  }

async function checkGammaV0Apy(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const exchange = poolInfo.metadata.exchange;

    // ACTIVITY APY COMPUTATION 

    
    const URL1 = getUrl_allData(chain,EXCHANGES_API[exchange]);
    const dataApy = await axios.get(URL1);
 
    const dataApyFiltered = dataApy.data[poolAddress.toLowerCase()];

    const apy = dataApyFiltered.returns.daily.feeApy;
    const apr = dataApyFiltered.returns.daily.feeApr;


    // REWARDS APY COMPUTATION 

    const URL2 = getUrl_allRewards2(chain,EXCHANGES_API[exchange]);
    const dataApyReward = await axios.get(URL2);
    const apr_rewards = getAprRewardByAddress(dataApyReward.data, poolAddress);


    return {
      data: {
        activity_apy: apr*100 || apy*100,
        rewards_apy: apr_rewards*100,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkGammaV0Apy;
