/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const checkGMXV0Share = require('./functions/sharePrice');
const checkGMXV0TVL = require('./functions/tvl');

/// APY
async function loadExternal() {
  const pools = await external.apy();
  if (!pools || pools.length === 0) {
    return null;
  }

  return pools;
}

async function analytics(chain, poolAddress) {
  const externalInformation = await loadExternal();
  console.log(externalInformation);
  //APY
  if (!externalInformation) return {};
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.pool.toLowerCase().includes(poolAddress.toLowerCase());
  });
  if (!externalInfo) return {};
  const rewardsAPY = externalInfo.apyReward;
  const activityAPY = externalInfo.apyBase;
  const totalAPY = rewardsAPY + activityAPY;

  //TVL and Share
  const shareInfo = await checkGMXV0Share(chain, poolAddress);
  if (shareInfo.err) throw new Error(shareInfo.err);
  const sharePrice = shareInfo.data;
  const TVLInfo = await checkGMXV0TVL(chain, poolAddress);
  if (TVLInfo.err) throw new Error(TVLInfo.err);
  const TVL = TVLInfo.data;

  const result = {
    status: null,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: activityAPY,
    rewards_apy: rewardsAPY,
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
  url: external.url,
};
