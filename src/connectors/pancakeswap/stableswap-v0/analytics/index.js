/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const getPancakeTVL = require('./functions/tvl');
const getPancakeShareprice = require('./functions/shareprice');
const getPancakeActAPY = require('./functions/actapy');
const getPancakeRewardAPY = require('./functions/rewapy');

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  console.log(POOLS);
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const stakingAddress = poolInfo.staking_address;
  const investingAddress = poolInfo.investing_address;

  const TVLInfo = await getPancakeTVL(
    chain,
    investingAddress,
    poolInfo.underlying_tokens[0],
    poolInfo.underlying_tokens[1],
  );
  if (TVLInfo.err) throw new Error(TVLInfo.err);
  const TVL = TVLInfo.data;
  const ShareInfo = await getPancakeShareprice(chain, poolAddress, TVL);
  if (ShareInfo.err) throw new Error(ShareInfo.err);
  const SharePrice = ShareInfo.data;
  const ActAPYInfo = await getPancakeActAPY(chain, poolAddress);
  if (ActAPYInfo.err) throw new Error(ActAPYInfo.err);
  const ActAPY = ActAPYInfo.data;
  const RewAPYInfo = await getPancakeRewardAPY(
    chain,
    poolAddress,
    stakingAddress,
    TVL,
  );
  if (RewAPYInfo.err) throw new Error(RewAPYInfo.err);
  const RewAPY = RewAPYInfo.data;
  const TotalAPY = ActAPY + RewAPY;

  const result = {
    status: true,
    tvl: TVL || null,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: TotalAPY,
    activity_apy: ActAPY || 0,
    rewards_apy: RewAPY || 0,
    boosting_apy: 0,
    share_price: SharePrice,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://pancakeswap.finance/farms',
};

analytics('bsc', '0xee1bcc9F1692E81A281b3a302a4b67890BA4be76');
