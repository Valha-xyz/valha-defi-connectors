/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools');
const checkStargateV0TVL = require('./functions/tvl');

/// APY
/// TVL
async function loadExternal(chain) {
  const pools = await external.apyChain(chain);
  if (!pools || pools.length === 0) {
    return null;
  }
  return pools;
}

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const externalInformation = await loadExternal(chain);
  if (!externalInformation) return {};
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.pool.toLowerCase().includes(poolAddress.toLowerCase());
  });

  if (!externalInfo) return {};

  const rewards_apy = externalInfo['apyReward'];
  const RewAPY = rewards_apy ? parseFloat(String(rewards_apy)) : 0;
  const tvl = await checkStargateV0TVL(chain, poolAddress);

  const result = {
    status: null,
    tvl: tvl.data,
    liquidity: tvl.data,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: RewAPY,
    activity_apy: 0,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: 1,
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
