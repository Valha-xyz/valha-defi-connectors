
const pools = require('../pools/pools');
import getData from './functions/getData';

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
//   console.log(POOLS)
  const resultInfo = await getData(chain, poolAddress);

  const info = resultInfo.data;
  if (info.err)
      throw new Error(`Data from Solidly indexer not ok for ${poolAddress}`);

  const sharePrice = info.totalSupply ? Number(info.totalTvlUsd)/Number(info.totalSupply) : null;
  const TVL = Number(info.totalTvlUsd);
  const outloans = 0;
  const liquidity = TVL;
  const ActAPY = 0;
  const RewAPY = Number(info.totalApy);
  const totalAPY = ActAPY + RewAPY;

  const result = {
    status: true,
    tvl: TVL,
    liquidity: liquidity,
    outloans: outloans,
    losses: null,
    capacity: null,
    apy: totalAPY,
    activity_apy: ActAPY,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: sharePrice > 0 ? sharePrice : null,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://solidly.com/liquidity/',
};