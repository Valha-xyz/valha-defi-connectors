/* eslint-disable @typescript-eslint/no-var-requires */
const checkTraderJoeTvl = require('./function/tvl');
const checkTraderJoeSupply = require('./function/totalSupply');
const checkTraderJoeApy = require('./function/apy');

async function analytics(chain, poolAddress) {
  try {
    const info = await checkTraderJoeTvl(chain, poolAddress);
    if (info.err) throw new Error(info.err);
    const tvl = info.data;

    const supplyInfo = await checkTraderJoeSupply(chain, poolAddress);
    if (supplyInfo.err) throw new Error(supplyInfo.err);
    const supply = supplyInfo.data;

    const apyInfo = await checkTraderJoeApy(chain, poolAddress);
    if (apyInfo.err) throw new Error(apyInfo.err);
    const apy = apyInfo.data;

    const ActAPY = apy.activity_apy;
    const RewAPY = apy.rewards_apy;
    const TotalAPY = ActAPY + RewAPY;
    const TVL = tvl.tvl;
    const sharePrice = TVL / supply;

    const result = {
      status: true,
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
  url: 'https://traderjoexyz.com/avalanche/pool?tab=auto-pools',
};
