/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools/pools');
const checkSharePrice = require('./functions/sharePrice');
const checkAngleV1APYTVL = require('./functions/apy');

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};

  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });

  const stakingAddress = poolInfo.staking_address
    ? poolInfo.staking_address
    : poolAddress;
  const sharePrice = await checkSharePrice(chain, poolAddress);
  const apyInfo = await checkAngleV1APYTVL(chain, stakingAddress);

  const dataAPY = apyInfo.data;

  const ActAPY = dataAPY ? dataAPY.activity_apy : 0;
  const RewAPY = dataAPY ? dataAPY.rewards_apy : 0;
  const totalAPY = ActAPY + RewAPY;
  const TVL = dataAPY ? dataAPY.tvl : 0;

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
    share_price: sharePrice.data,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: external.url,
};
