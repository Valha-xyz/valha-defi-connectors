/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkStaderTVL = require('./functions/tvl');
const checkStaderSharePrice = require('./functions/shareprice');
const checkStaderAPY = require('./functions/apy');
const { getNodeProvider } = require ('../../../../../utils/getNodeProvider')
const { ethers } = require ('ethers')

async function analytics(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const investing_address = poolInfo.investing_address;

    const TVL = await checkStaderTVL(chain, poolAddress);
    if (TVL.err) throw new Error(TVL.err);
    const apy = await checkStaderAPY(chain, poolAddress);
    if (apy.err) throw new Error(apy.err);
    const parsedAPY = parseFloat(apy.data);
    const shareprice = await checkStaderSharePrice(chain, poolAddress, investing_address);
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
  url: 'https://www.Stader.com/staking/stake/',
};
