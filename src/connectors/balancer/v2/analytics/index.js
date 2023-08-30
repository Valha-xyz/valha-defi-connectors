/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const checkBalancerV2TVL = require('./functions/tvl');
const checkBalancerV2APY = require('./functions/apy');
const checkBalancerV2SharePrice = require('./functions/sharePrice');

async function analytics(chain, poolAddress) {

  try {

  const tvlInfo = await checkBalancerV2TVL(chain, poolAddress);
  if (tvlInfo.err) throw new Error(tvlInfo.err);
  const tvl = tvlInfo.data;

  const sharePrice = await checkBalancerV2SharePrice(chain, poolAddress);
  if (sharePrice.err) throw new Error(sharePrice.err);
  const sharePriceUSD = sharePrice.data.sharePriceUSD;
  const shareToken0 = sharePrice.data.sharePriceToken0;
  const shareToken1 = sharePrice.data.sharePriceToken1;
  const shareToken2 = sharePrice.data.sharePriceToken2;
  const shareToken3 = sharePrice.data.sharePriceToken3;

  const x = {tvl: tvl, totalShares: sharePrice.data.totalShares}

  const apy = await checkBalancerV2APY(chain, poolAddress, x);
  if (apy.err) throw new Error(apy.err);
  const activityApy = apy.data.actApy;
  const rewardsApy = apy.data.rewApy;
  const volume = apy.data.volume;

  
  
   const result = {
      status: null,
      tvl: tvl,
      liquidity: tvl,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: activityApy + rewardsApy,
      activity_apy: activityApy,
      rewards_apy: rewardsApy,
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
