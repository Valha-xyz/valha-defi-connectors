/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkAnkrTVL = require('./functions/tvl');
const checkAnkrSharePrice = require('./functions/shareprice');
const checkAnkrMinimum = require('./functions/minimum');
const checkAnkrAPY = require('./functions/apy');

async function analytics(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const investing_address = poolInfo.investing_address;

    const TVL = await checkAnkrTVL(chain, poolAddress);
    if (TVL.err) throw new Error(TVL.err);
    const apy = await checkAnkrAPY(chain, poolAddress);
    if (apy.err) throw new Error(apy.err);
    const shareprice = await checkAnkrSharePrice(chain, poolAddress);
    if (shareprice.err) throw new Error(shareprice.err);

    const minimum = await checkAnkrMinimum(chain, investing_address);
    if (minimum.err) throw new Error(minimum.err);
    const parsedAPY = parseFloat(apy.data);

    const result = {
      status: true,
      tvl: TVL.data,
      liquidity: TVL.data,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: parsedAPY,
      activity_apy: parsedAPY,
      rewards_apy: 0,
      boosting_apy: 0,
      share_price: shareprice.data,
      minimum_deposit: minimum.data,
      maximum_deposit: null,
    };
    return result;
  } catch (err) {
    console.log(err);
    return {};
  }
}

module.exports = {
  main: analytics,
  url: 'https://www.ankr.com/staking/stake/',
};
