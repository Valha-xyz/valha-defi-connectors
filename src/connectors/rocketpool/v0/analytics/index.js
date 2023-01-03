/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools');
const checkRocketV0Status = require('./external/status');
const checkRocketV0TVL = require('./external/tvl');
const checkRocketV0Liquidity = require('./external/liquidity');
const checkRocketV0SharePrice = require('./external/shareprice');
const checkRocketV0Minimum = require('./external/minimum');
const checkRocketV0Maximum = require('./external/maximum');
const checkRocketV0APY = require('./external/apy');

const SETTING_ADDRESS = '0xCc82C913B9f3a207b332d216B101970E39E59DB3';

async function analytics(chain, poolAddress) {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const status = await checkRocketV0Status(chain, poolAddress);
    if (status.err) throw new Error(status.err);
    const TVL = await checkRocketV0TVL(chain, poolAddress);
    if (TVL.err) throw new Error(TVL.err);
    const liquidity = await checkRocketV0Liquidity(chain, poolAddress);
    if (liquidity.err) throw new Error(liquidity.err);
    const shareprice = await checkRocketV0SharePrice(chain, poolAddress);
    if (shareprice.err) throw new Error(shareprice.err);
    const minimum = await checkRocketV0Minimum(chain, poolAddress);
    if (minimum.err) throw new Error(minimum.err);
    const maximum = await checkRocketV0Maximum(chain, poolAddress);
    if (maximum.err) throw new Error(maximum.err);
    const apy = await checkRocketV0APY(chain, poolAddress);
    if (apy.err) throw new Error(apy.err);

    const result = {
      status: status.data,
      tvl: TVL.data,
      liquidity: liquidity.data,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: apy.data,
      activity_apy: apy.data,
      rewards_apy: null,
      boosting_apy: null,
      share_price: shareprice.data,
      minimum_deposit: minimum.data,
      maximum_deposit: maximum.data,
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
  url: external.url,
};
