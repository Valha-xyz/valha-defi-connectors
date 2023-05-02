/* eslint-disable @typescript-eslint/no-var-requires */
const checkSharePrice = require('./functions/sharePrice');
const checkConcentatorTVL = require('./functions/tvl');
const _ = require('lodash');
const pools = require('../pools/pools');

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const sharePriceInfo = await checkSharePrice(chain, poolAddress);
  const sharePrice = sharePriceInfo.data;
  const TVLInfo = await checkConcentatorTVL(
    chain,
    poolAddress,
    sharePrice,
    poolInfo.metadata.initial_tokens[0]
  );

  const ActAPY = null;
  const RewAPY = null;
  const totalAPY = null;
  const TVL = TVLInfo ? TVLInfo.data : null;

  const result = {
    status: null,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
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
  url: 'https://concentrator.aladdin.club/#/vaults',
};

analytics('ethereum', '0x43e54c2e7b3e294de3a155785f52ab49d87b9922');
