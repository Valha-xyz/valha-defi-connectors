/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkBolideTVL = require('./functions/tvl');
const checkBolideAPY = require('./functions/apy');


async function analytics(chain, poolAddress) {
  let result = {};
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });

  // FIND TVL

  const tvlInfo = await checkBolideTVL(chain, poolAddress);
  if (tvlInfo.err) throw new Error(tvlInfo.err);
  const tvl = tvlInfo.data;

  // Share price is 1
  const sharePrice = 1;

  // FIND APY
  
  const apyInfo = await checkBolideAPY(chain,poolAddress);
    if (apyInfo.err) throw new Error(apyInfo.err);
  const RewAPY = apyInfo.data.rewardApy;
  const ActAPY = apyInfo.data.activityApy;


    result = {
      status: null,
      tvl: tvl,
      liquidity: tvl,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: RewAPY + ActAPY,
      activity_apy: ActAPY,
      rewards_apy: RewAPY,
      boosting_apy: null,
      share_price: sharePrice,
      minimum_deposit: null,
      maximum_deposit: null,
    };
  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: "https://across.to/pool",
};
