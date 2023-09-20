/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkFraxTVL = require('./functions/tvl');
const checkFraxSharePrice = require('./functions/shareprice');
const checkFraxAPY = require('./functions/apy');

async function analytics(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const stakingAddress = poolInfo.staking_address;

    const TVL = await checkFraxTVL(chain, poolAddress);
    if (TVL.err) throw new Error(TVL.err);
    const apy = await checkFraxAPY(chain, poolAddress);
    if (apy.err) throw new Error(apy.err);
    const parsedAPY = parseFloat(apy.data);
    const shareprice = await checkFraxSharePrice(chain, poolAddress, stakingAddress);
    if (shareprice.err) throw new Error(shareprice.err);

    

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
      minimum_deposit: null,
      maximum_deposit: null,
    };
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return {};
  }
}

module.exports = {
  main: analytics,
  url: 'https://app.frax.finance/frxeth/stake',
};
