/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const checkArrakisV1TVL = require('./functions/tvl');
const checkArrakisV1APY = require('./functions/apy');
const checkArrakisV1SharePrice = require('./functions/sharePrice');

async function analytics(chain, poolAddress) {

  try {

  const tvlInfo = await checkArrakisV1TVL(chain, poolAddress);
  if (tvlInfo.err) throw new Error(tvlInfo.err);
  const tvl = tvlInfo.data;

  const apy = await checkArrakisV1APY(chain, poolAddress);
  if (apy.err) throw new Error(apy.err);
  const activityApy = apy.data.apy;
  const volume = apy.data.volume;

  const sharePrice = await checkArrakisV1SharePrice(chain, poolAddress);
  if (sharePrice.err) throw new Error(sharePrice.err);
  const sharePriceUSD = sharePrice.data.sharePriceUSD;
  const shareToken0 = sharePrice.data.sharePriceToken0;
  const shareToken1 = sharePrice.data.sharePriceToken1;
  
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
      share_price: shareToken0,
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
