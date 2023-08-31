/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const getAuraAPY = require('./functions/getAuraAPY');
const getAuraPoolTVL = require('./functions/getAuraPoolTvl');
const getAuraSharePrice = require('./functions/getAuraSharePrice');

// TO DO: review analytics specifically for Arbitrum
async function analytics(chain, poolAddress) {

  const auraTVL = await getAuraPoolTVL(chain,poolAddress);
  if (auraTVL.err) throw new Error(auraTVL.err.message);
  const TVL = auraTVL.data.tvlPool;
  const CAPA = auraTVL.data.tvlUnderlying;

  const auraSharePrice = await getAuraSharePrice(chain,poolAddress);
  if (auraSharePrice.err) throw new Error(auraSharePrice.err.message);
  const sharePrice = auraSharePrice.data;


  const auraAPY = await getAuraAPY(chain,poolAddress, TVL);
  if (auraAPY.err) throw new Error(auraAPY.err.message);

  console.log(auraAPY);
  const ActAPY = auraAPY.data.actApy;
  const RewAPY = auraAPY.data.rewApyAura + auraAPY.data.rewApyBal + auraAPY.data.rewApyExtra;
  const totalAPY = ActAPY + RewAPY;
  
  const result = {
    status: true,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: CAPA, // tvl of underlying
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
  url: 'https://www.Aurafinance.com/stake',
};
