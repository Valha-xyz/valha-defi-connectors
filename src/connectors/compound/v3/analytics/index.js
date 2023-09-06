/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkCompoundV3Data = require('./functions/getData');


async function analytics(chain, poolAddress) {
  // Find information about underlying token.
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const underlyingToken = poolInfo.underlying_tokens[0];
  if (!underlyingToken) {
    throw new Error('Error: no underlying found for Compound');
  }

  // Find information on Compound API.
  const info = await checkCompoundV3Data(chain, poolAddress, underlyingToken);
  const APY = info.data.apyAct || 0;
  const RewAPY = info.data.apyRew || 0;
  const borrow = info.data.borrow || 0;
  const sharePrice = info.data.sharePrice || 0;
  const TVL = info.data.TVL || 0;

  const result = {
    status: null,
    tvl: TVL,
    liquidity: TVL - borrow,
    outloans: borrow,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: APY + RewAPY,
    activity_apy: APY,
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
  url: 'https://v2-app.compound.finance/',
};
