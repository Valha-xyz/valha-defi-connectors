/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools');
const checkAaveV3TVL = require('./functions/tvl');
const checkAaveV3Liquidity = require('./functions/liquidity');
const checkAaveV3APYs = require('./functions/apys');

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const tvl = await checkAaveV3TVL(chain, poolAddress);
  const liquidity = await checkAaveV3Liquidity(chain, poolAddress);
  const outloans = tvl - liquidity;
  const APY = await checkAaveV3APYs(chain, poolAddress, parseFloat(tvl));
  if (APY.err) throw new Error(APY.err);
  const ActAPY = APY.data['activity_apy'];
  const RewAPY = APY.data['activity_rewards'];
  const totalAPY = activity_apy + rewards_apy;

  const result = {
    status: null,
    tvl: tvl,
    liquidity: liquidity,
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

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://app.aave.com/',
};
