import {
  Analytics,
  AnalyticsExport,
} from '../../../../utils/types/connector-types';

/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
import pools from '../pools/pools';
import checkAaveV3TVL from './functions/tvl';
import checkAaveV3Liquidity from './functions/liquidity';
import checkAaveV3APYs from './functions/apys';

async function analytics(
  chain,
  poolAddress,
): Promise<Analytics | Record<never, never>> {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const tvlData = await checkAaveV3TVL(chain, poolAddress);
    if (tvlData.err) throw new Error(tvlData.err);
    const tvl = tvlData.data;
    const liquidityData = await checkAaveV3Liquidity(chain, poolAddress);
    if (liquidityData.err) throw new Error(liquidityData.err);
    const liquidity = liquidityData.data;
    const outloans = tvl - liquidity;
    const APY = await checkAaveV3APYs(chain, poolAddress, parseFloat(tvl));
    if (APY.err) throw new Error(APY.err);
    const ActAPY = APY.data.activity_apy;
    const RewAPY = APY.data.rewards_apy;
    const totalAPY = ActAPY + RewAPY;

    const result = {
      status: true,
      tvl,
      liquidity,
      outloans,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: totalAPY,
      activity_apy: ActAPY,
      rewards_apy: RewAPY,
      boosting_apy: 0,
      share_price: 1,
      minimum_deposit: null,
      maximum_deposit: null,
    };

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const analyticsExport: AnalyticsExport = {
  main: analytics,
  url: 'https://app.aave.com/',
};
export default analyticsExport;
