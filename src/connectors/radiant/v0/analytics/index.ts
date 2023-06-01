import {
  type Analytics,
  type AnalyticsExport
} from '../../../../utils/types/connector-types'
import pools from '../pools/pools'
import checkRadiantTVL from './functions/tvl'
import checkRadiantLiquidity from './functions/liquidity'
import checkRadiantAPYs from './functions/apys'

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
    const tvlData = await checkRadiantTVL(chain, poolAddress)
    if (tvlData.err) throw new Error(tvlData.err)
    const tvl = tvlData.data
    

    // Pool liquidity
    const liquidityData = await checkRadiantLiquidity(chain, poolAddress)
    if (liquidityData.err) throw new Error(liquidityData.err)
    const liquidity = liquidityData.data
    const outloans = tvl - liquidity


    // APY
    const APY = await checkRadiantAPYs(chain, poolAddress)

    console.log(APY)
    
    if (APY.err) throw new Error(APY.err)
    const ActAPY = APY.data.activity_apy
    const RewAPY = APY.data.reward_apy
    const totalAPY = ActAPY + RewAPY

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
  url: 'https://app.radiant.capital/#/markets'
}
export default analyticsExport