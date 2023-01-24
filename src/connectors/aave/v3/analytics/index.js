/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools');
const checkAaveV3TVL = require('./functions/tvl');
const checkAaveV3Liquidity = require('./functions/liquidity');
const checkAaveV3APYs = require('./functions/apys');

async function analytics(chain, poolAddress) {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const tvlData = await checkAaveV3TVL(chain, poolAddress);
    if (tvlData.err) throw new Error(tvlData.err);
    const tvl = tvlData.data;
    const liquidityData = await checkAaveV3Liquidity(chain, poolAddress);
    if (liquidityData.err) throw new Error(liquidityData.err);
    const liquidity = liquidityData.data;
    const outloans = tvl - liquidity;
    const APY = await checkAaveV3APYs(chain, poolAddress, parseFloat(tvl));
    if (APY.err) throw new Error(APY.err);
    const ActAPY = APY.data['activity_apy'];
    const RewAPY = APY.data['rewards_apy'];
    const totalAPY = ActAPY + RewAPY;

    const result = {
      status: true,
      tvl: tvl,
      liquidity: liquidity,
      outloans: outloans,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: totalAPY,
      activity_apy: ActAPY,
      rewards_apy: RewAPY,
      boosting_apy: 0,
      share_price: 1,
      minimum_deposit: null,
      maximum_deposit: null,
    };

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  main: analytics,
  url: 'https://app.aave.com/',
};
