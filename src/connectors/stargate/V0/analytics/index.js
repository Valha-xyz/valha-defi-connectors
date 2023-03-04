/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools/pools');
const checkStargateV0TVL = require('./functions/tvl');
const checkStargateV0RewardsAPY = require('./functions/rewApyOP');
const checkStargateV0SharePrice = require('./functions/sharePrice');

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
  let result = {};
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const tvlInfo = await checkStargateV0TVL(chain, poolAddress);
  if (tvlInfo.err) throw new Error(tvlInfo.err);
  const tvl = tvlInfo.data;
  const shareInfo = await checkStargateV0SharePrice(chain, poolAddress, tvl);
  if (shareInfo.err) throw new Error(shareInfo.err);
  const sharePrice = shareInfo.data;

  // FIND APY
  if (chain === 'optimism') {
    const apyInfo = await checkStargateV0RewardsAPY(
      chain,
      poolAddress,
      poolInfo.staking_address,
      poolInfo.rewards_tokens[0],
      tvl,
    );
    if (apyInfo.err) throw new Error(apyInfo.err);
    const RewAPY = apyInfo.data;
    result = {
      status: null,
      tvl: tvl,
      liquidity: tvl,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: RewAPY,
      activity_apy: 0,
      rewards_apy: RewAPY,
      boosting_apy: null,
      share_price: sharePrice,
      minimum_deposit: null,
      maximum_deposit: null,
    };
  } else {
    const externalInformation = await loadExternal(chain);
    if (!externalInformation) return {};
    const externalInfo = _.find(externalInformation, (elem) => {
      return elem.pool.toLowerCase().includes(poolAddress.toLowerCase());
    });
    if (!externalInfo) return {};
    const rewards_apy = externalInfo.apyReward;
    const RewAPY = rewards_apy ? parseFloat(String(rewards_apy)) : 0;
    result = {
      status: null,
      tvl: tvl,
      tvl: tvl,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: RewAPY,
      activity_apy: 0,
      rewards_apy: RewAPY,
      boosting_apy: null,
      share_price: sharePrice,
      minimum_deposit: null,
      maximum_deposit: null,
    };
  }

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: external.url,
};
