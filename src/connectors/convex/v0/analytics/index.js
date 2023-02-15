/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const getCurvePoolTVL = require('./functions/getCurvePoolTvl');
const checkConvexData = require('./functions/getData');
const checkPoolSupply = require('./functions/totalSupply');

async function analytics(chain, poolAddress) {
  // Find pool information
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });

  const id = '';
  // Find APYs information
  const info = await checkConvexData(chain, poolAddress, id);
  if (info.err) throw new Error(info.err.message);
  const apyInfo = info.data;
  const ActAPY = info['supplyApy'] ? info['supplyApy'] : 0;
  const RewAPY = 0;
  const totalAPY = ActAPY + RewAPY;

  // Find TVL information
  const underlyingLPAddress =
    poolInfo.underlying_tokens.length > 0
      ? poolInfo.underlying_tokens[0]
      : null;
  if (!underlyingLPAddress) {
    throw new Error(
      `Error: impossible to find the LP pool on Cvx for ${poolAddress}`
    );
  }
  const supplyCvxInfo = await checkPoolSupply(chain, poolAddress);
  if (supplyCvxInfo.err) throw new Error(supplyCvxInfo.err.message);
  const supplyCvx = supplyCvxInfo.data;
  const supplyCrvInfo = await checkPoolSupply(chain, underlyingLPAddress);
  if (supplyCrvInfo.err) throw new Error(supplyCrvInfo.err.message);
  const supplyCrv = supplyCrvInfo.data;
  const tvlUSDCrvInfo = await getCurvePoolTVL(chain);
  if (tvlUSDCrvInfo.err) throw new Error(tvlUSDCrvInfo.err.message);
  const tvlUSDCrv = tvlUSDCrvInfo.data;
  const TVL = (supplyCvx / supplyCrv) * tvlUSDCrv;
  const liquidity = TVL;
  const sharePrice = 1;

  const result = {
    status: true,
    tvl: TVL,
    liquidity: liquidity,
    outloans: null,
    losses: null,
    capacity: tvlUSDCrv, // tvl of underlying
    apy: totalAPY,
    activity_apy: ActAPY,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: sharePrice,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);
  return result;
}

module.exports = {
  main: analytics,
  url: 'https://www.convexfinance.com/stake',
};
