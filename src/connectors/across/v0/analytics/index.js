/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkAcrossV0TVL = require('./functions/tvl');
const checkAcrossV0APY = require('./functions/apy');
const checkAcrossV0SharePrice = require('./functions/sharePrice');


async function analytics(chain, poolAddress) {
  let result = {};
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });

  // FIND TVL

  const tvlInfo = await checkAcrossV0TVL(chain, poolAddress);
  if (tvlInfo.err) throw new Error(tvlInfo.err);
  const tvl = tvlInfo.data;

  // FIND SHARE PRICE

  const shareInfo = await checkAcrossV0SharePrice(chain, poolAddress, tvl);
  if (shareInfo.err) throw new Error(shareInfo.err);
  const sharePrice = shareInfo.data;

  // FIND APY
  
  const apyInfo = await checkAcrossV0APY(chain,poolAddress);
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
