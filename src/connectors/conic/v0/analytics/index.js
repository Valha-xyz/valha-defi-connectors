/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools/pools');
const checkConicV0TVL = require('./functions/tvl');
const checkConicV0SharePrice = require('./functions/sharePrice');

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
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const externalInformation = await loadExternal();
  if (!externalInformation) return {};
  const externalInfo = _.find(externalInformation, (elem) => {
    return (
      elem.underlyingTokens[0].toLowerCase() ===
      poolInfo.underlying_tokens[0].toLowerCase()
    );
  });

  const TVLInfo = await checkConicV0TVL(
    chain,
    poolInfo.investing_address,
    poolInfo.underlying_tokens[0],
  );
  if (TVLInfo.err) throw new Error(TVLInfo.err);
  const TVL = TVLInfo.data;
  const sharePriceInfo = await checkConicV0SharePrice(
    chain,
    poolInfo.investing_address,
  );
  if (sharePriceInfo.err) throw new Error(sharePriceInfo.err);
  const sharePrice = sharePriceInfo.data;

  const ActAPY = externalInfo ? externalInfo.apyBase : 0;
  const RewAPY = externalInfo ? externalInfo.apyReward : 0;
  const totalAPY = ActAPY + RewAPY;

  const result = {
    status: null,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
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
  url: external.url,
};
