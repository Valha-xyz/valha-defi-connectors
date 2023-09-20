/* eslint-disable @typescript-eslint/no-var-requires */
const checkVelodromeV2Data = require('./function/data');
const checkVelodromeV2Supply = require('./function/totalSupply');
const checkVelodromeV2SharePrice = require('./function/sharePrice');

async function analytics(chain, poolAddress) {
  try {
    const info = await checkVelodromeV2Data(chain, poolAddress);
    if (info.err) throw new Error(info.err);
    const data = info.data;

    const supplyInfo = await checkVelodromeV2Supply(chain, poolAddress);
    if (supplyInfo.err) throw new Error(supplyInfo.err);
    const supply = supplyInfo.data;

    const sharePriceInfo = await checkVelodromeV2SharePrice(chain, poolAddress, data.tvl);
    if (sharePriceInfo.err) throw new Error(sharePriceInfo.err);
    const sharePrice = sharePriceInfo.data;


    const ActAPY = 0;
    const RewAPY = data.rewards_apy;
    const TotalAPY = ActAPY + RewAPY;
    const TVL = data.tvl;
    // const sharePrice = TVL / supply;

    const result = {
      status: null,
      tvl: TVL,
      liquidity: TVL,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: TotalAPY,
      activity_apy: ActAPY,
      rewards_apy: RewAPY,
      boosting_apy: null,
      share_price: sharePrice.sharePriceToken0,
      minimum_deposit: null,
      maximum_deposit: null,
      volume: data.volume,
      fee: data.fee,
    };

    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  main: analytics,
  url: 'https://velodrome.finance/liquidity',
};
