/* eslint-disable @typescript-eslint/no-var-requires */
import { checkAngleApr } from './functions/apr';
import { checkAngleTvl } from './functions/tvl';
import { checkAngleSharePrice } from './functions/sharePrice';

const _ = require('lodash');

async function analytics(chain, poolAddress) {

  const tvl = await checkAngleTvl(chain, poolAddress);
  const sharePrice = await checkAngleSharePrice(chain, poolAddress);
  const rewardsApy = { data: 0, err: null };
  const apr = await checkAngleApr(chain, poolAddress);
  const totalAPY = apr.data + rewardsApy.data;

  const result = {
    status: true,
    tvl: tvl.data,
    liquidity: tvl.data,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: apr.data,
    rewards_apy: rewardsApy.data,
    boosting_apy: null,
    share_price: parseFloat(String(sharePrice.data)),
    minimum_deposit: null,
    maximum_deposit: null,
  };
  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: "https://www.angle.money/",
};
