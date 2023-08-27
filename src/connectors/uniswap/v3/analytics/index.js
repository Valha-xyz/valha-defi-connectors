/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const checkUniV3TVL = require('./functions/tvl');
const checkUniV3APY = require('./functions/apy');

async function analytics(chain, poolAddress) {

  try {

  const tvlInfo = await checkUniV3TVL(chain, poolAddress);
  if (tvlInfo.err) throw new Error(tvlInfo.err);
  const tvl = tvlInfo.data;

  const apy = await checkUniV3APY(chain, poolAddress, tvl);
  if (apy.err) throw new Error(apy.err);
  const activityApy = apy.data.apy;
  const volume = apy.data.volume;
;
   const result = {
      status: null,
      tvl: tvl,
      liquidity: tvl,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: activityApy,
      activity_apy: activityApy,
      rewards_apy: 0,
      boosting_apy: null,
      share_price: 1,
      minimum_deposit: null,
      maximum_deposit: null,
      volume: volume
    };


  console.log(result);

  return result;
  }
  catch (err) {
    console.log(err);
    return { data: null, err };
  }


}

module.exports = {
  main: analytics,
  url: "https://info.uniswap.org/#/pools",
};
