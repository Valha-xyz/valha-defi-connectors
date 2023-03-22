import {
  type Analytics,
  type AnalyticsExport
} from '../../../../utils/types/connector-types'
import { getVaults } from '../pools/updatePools'

/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')

async function analytics (
  chain,
  poolAddress
): Promise<Analytics | Record<never, never>> {
  try {
    const POOLS = await getVaults(chain);
    const currentPool = POOLS.find((pool)=> pool.address == poolAddress);

    if (!POOLS || POOLS.length === 0) return {}

    const tvl = currentPool.tvl;
    const outloans = currentPool.totalBorrowUsd
    const liquidity = tvl - outloans;
    const apy = currentPool.base;

    const result = {
      status: currentPool.active,
      tvl,
      liquidity,
      outloans,
      losses: null,
      capacity: liquidity,
      apy: apy,
      activity_apy: apy,
      rewards_apy: 0, // No rewards on deposit pools
      boosting_apy: 0,
      share_price: 1,
      minimum_deposit: null,
      maximum_deposit: null
    }

    return result
  } catch (err) {
    console.log(err)
    return null
  }
}

const analyticsExport: AnalyticsExport = {
  main: analytics,
  url: 'https://app.aave.com/'
}
export default analyticsExport
