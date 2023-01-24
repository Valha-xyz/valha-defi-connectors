const checkVelodromeV0Data = require('./function/data');
const checkVelodromeV0Supply = require('./function/totalSupply');

async function analytics(chain, poolAddress) {
  try {
    const info = await checkVelodromeV0Data(chain, poolAddress);
    if (info.err) throw new Error(info.err);
    const data = info.data;

    const supplyInfo = await checkVelodromeV0Supply(chain, poolAddress);
    if (supplyInfo.err) throw new Error(supplyInfo.err);
    const supply = supplyInfo.data;

    const ActAPY = 0;
    const RewAPY = data['rewards_apy'];
    const TotalAPY = ActAPY + RewAPY;
    const TVL = data['tvl'];
    const sharePrice = TVL / supply;

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
      share_price: sharePrice,
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
