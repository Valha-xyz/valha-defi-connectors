const external = require('./external/DefiLlama/index');

/// APY
/// TVL
async function loadExternal() {
  const pools = await external.apy();
  if (!pools || pools.length === 0) {
    return null;
  }
  return pools;
}

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const externalInformation = await loadExternal();
  if (!externalInformation) return {};
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.pool.includes(poolAddress.toLowerCase());
  });

  const tvl = externalInfo['tvlUsd'];
  const rewardsAPY = externalInfo['apyReward'];
  const activityAPY = externalInfo['apyBase'];
  const totalAPY = rewardsAPY + activityAPY;

  const result = {
    status: true,
    tvl: tvl,
    liquidity: tvl,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: activityAPY ? activityAPY : 0,
    rewards_apy: rewardsAPY ? rewardsAPY : 0,
    boosting_apy: 0,
    share_price: null,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  return result;
}

module.exports = {
  main: analytics,
  url: external.url,
};
