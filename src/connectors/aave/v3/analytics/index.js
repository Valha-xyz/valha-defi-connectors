/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools');

async function loadExternal(chain) {
  try {
    const pools = await external.getApy(chain);
    if (!pools || pools.length === 0) {
      return null;
    }
    return pools;
  } catch (err) {
    console.log(err);
  }
}

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  console.log('here');
  const externalInformation = await loadExternal(chain);
  console.log('bug');
  if (!externalInformation) return {};
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.address.includes(poolAddress.toLowerCase());
  });

  const tvl = externalInfo['tvlUsd'];
  const activity_apy = externalInfo['apyBase'];
  const rewards_apy = externalInfo['apyReward'];
  const outloans = externalInfo['totalBorrowUsd'];

  const totalAPY = activity_apy + rewards_apy;

  const result = {
    status: null,
    tvl: tvl,
    liquidity: tvl,
    outloans: outloans,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: ActAPY,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://app.aave.com/',
};
