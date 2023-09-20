/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkStakewiseTVL = require('./functions/tvl');
const checkStakewiseSharePrice = require('./functions/shareprice');
const checkStakewiseAPY = require('./functions/apy');

async function analytics(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });


    const TVL = await checkStakewiseTVL(chain, poolAddress);
    if (TVL.err) throw new Error(TVL.err);
    const apy = await checkStakewiseAPY(chain, poolAddress);
    if (apy.err) throw new Error(apy.err);
    const parsedAPY = parseFloat(apy.data);
    const shareprice = await checkStakewiseSharePrice(chain, poolAddress, poolInfo.distributor_address);
    if (shareprice.err) throw new Error(shareprice.err);

    shareApr = shareprice.data.shareApr;

    

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
      share_price: shareprice.data.sharePrice,
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
  url: 'https://www.Stakewise.com/staking/stake/',
};
