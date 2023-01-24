const checkVelodromeV0Data = require('./function/data');

async function analytics(chain, poolAddress) {
  try {
    const info = await checkVelodromeV0Data(chain, poolAddress);
    if (info.err) throw new Error(info.err);
    const data = info.data;

    const ActAPY = 0;
    const RewAPY = data['rewards_apy'];
    const TotalAPY = ActAPY + RewAPY;
    const TVL = data['tvl'];

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
      share_price: sharePrice.data,
      minimum_deposit: null,
      maximum_deposit: null,
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
  url: 'https://app.velodrome.finance/liquidity',
};
