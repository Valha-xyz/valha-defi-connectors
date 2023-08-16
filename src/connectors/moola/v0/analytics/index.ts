import {
  type Analytics,
  type AnalyticsExport
} from '../../../../utils/types/connector-types'
import pools from '../pools/pools'
import checkMoolaTVL from './functions/tvl'
import checkMoolaLiquidity from './functions/liquidity'
import checkMoolaAPYs from './functions/apys'

/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')

async function analytics (
  chain,
  poolAddress
): Promise<Analytics | Record<never, never>> {
  try {
    const POOLS = await pools()
    if (!POOLS || POOLS.length === 0) return {}

    // Pool TVL
    const tvlData = await checkMoolaTVL(chain, poolAddress)
    if (tvlData.err) throw new Error(tvlData.err)
    const tvl = tvlData.data
    

    // Pool liquidity
    const liquidityData = await checkMoolaLiquidity(chain, poolAddress)
    if (liquidityData.err) throw new Error(liquidityData.err)
    const liquidity = liquidityData.data
    const outloans = tvl - liquidity


    // APY
    const APY = await checkMoolaAPYs(chain, poolAddress)

    
    if (APY.err) throw new Error(APY.err)
    const ActAPY = APY.data.activity_apy
    const totalAPY = ActAPY

    const result = {
      status: true,
      tvl,
      liquidity,
      outloans,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: totalAPY,
      activity_apy: ActAPY,
      rewards_apy: 0,
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
  url: 'https://app.moola.market/'
}
export default analyticsExport