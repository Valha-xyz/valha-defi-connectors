/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools');
const checkSharePrice = require('./functions/sharePrice');
const checkApyActivity = require('./functions/apyActivity');
const checkV1Liquidity = require('./functions/liquidity');
const checkCapacity = require('./functions/capacity');
const checkWombatV1TVL = require('./functions/tvl');

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
    return elem.pool.toLowerCase() === poolAddress.toLowerCase();
  });

  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const tokenAddr = poolInfo['underlying_tokens'][0];

  let tvl;
  let rewards_apy = 0;
  if (externalInfo) {
    tvl = externalInfo['tvlUsd'];
    rewards_apy = externalInfo['apyReward'];
  } else {
    const tvlInfo = await checkWombatV1TVL(chain, poolAddress);
    tvl = tvlInfo.data;
  }
  const sharePrice = await checkSharePrice(chain, poolAddress);
  const liquidity = await checkV1Liquidity(chain, poolAddress);
  const capacity = await checkCapacity(chain, poolAddress, tokenAddr);

  const RewAPY = rewards_apy.data ? parseFloat(String(rewards_apy.data)) : 0;
  const totalAPY = RewAPY;

  const result = {
    status: null,
    tvl: tvl,
    liquidity: liquidity.data,
    outloans: null,
    losses: null,
    capacity: capacity.data,
    apy: totalAPY,
    activity_apy: 0,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: sharePrice.data,
  };
  return result;
}

module.exports = {
  main: analytics,
  url: external.url,
};
