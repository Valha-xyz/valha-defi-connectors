/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools');

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
    if (elem.symbol === 'S*USDT') {
      console.log(poolAddress);
      console.log(elem.pool);
      console.log(elem.chain);
      console.log(elem.symbol);
      console.log(elem.pool.includes(poolAddress));
    }
    return elem.pool.toLowerCase().includes(poolAddress.toLowerCase());
  });

  if (!externalInfo) return {};

  const tvl = externalInfo['tvlUsd'];
  const rewards_apy = externalInfo['apyReward'];
  const TVL = tvl ? parseFloat(String(tvl)) : 0;
  const RewAPY = rewards_apy ? parseFloat(String(rewards_apy)) : 0;

  const result = {
    status: null,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: RewAPY,
    activity_apy: 0,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: 1,
  };

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: external.url,
};
