/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');

import { fetchVaults, getVaultExtendedApiAddr } from './external/yearn.api';
import { checkYearnLiquidity } from './functions/liquidity';
import { checkYearnMaxDeposit } from './functions/maxDeposit';
import { checkYearnOutstandingLoans } from './functions/outloans';
import { checkYearnSharePrice } from './functions/sharePrice';

async function analytics(chain, poolAddress) {
  const allPoolInfo = await fetchVaults();

  // We get the current pool inside this big array
  const currentPoolInfo = allPoolInfo.find(
    (pool) => pool.address.toLowerCase() == poolAddress.toLowerCase()
  );

  const tvl = currentPoolInfo?.tvl?.tvl;
  const sharePrice = await checkYearnSharePrice(chain, poolAddress);
  const activityApy = currentPoolInfo?.apy?.net_apy;
  const rewardsApy = { data: 0, err: null };
  const liquidity = await checkYearnLiquidity(chain, poolAddress);
  const outloans = await checkYearnOutstandingLoans(chain, poolAddress);
  const maxDeposit = await checkYearnMaxDeposit(chain, poolAddress);

  const totalAPY = activityApy + rewardsApy.data;

  const result = {
    status: null,
    tvl: tvl,
    liquidity: liquidity.data,
    outloans: outloans.data,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: activityApy,
    rewards_apy: rewardsApy.data,
    boosting_apy: null,
    share_price: parseFloat(String(sharePrice.data)),
    minimum_deposit: null,
    maximum_deposit: maxDeposit.data,
  };

  return result;
}

//analytics("ethereum", "0x04c8bfe2eb09a1e2e9fA97A2fd970E06d87B43de")
module.exports = {
  main: analytics,
  url: getVaultExtendedApiAddr('ethereum'),
};
