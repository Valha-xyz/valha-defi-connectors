import {
  type Analytics,
  type AnalyticsExport
} from '../../../../utils/types/connector-types'
import pools from '../pools/pools'
import checkSparkTVL from './functions/tvl'
import checkSparkLiquidity from './functions/liquidity'
import checkSparkAPYs from './functions/apys'

/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')

async function analytics (
  chain,
  poolAddress
): Promise<Analytics | Record<never, never>> {
  try {
    const POOLS = await pools()
    if (!POOLS || POOLS.length === 0) return {}
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });
    const underlyingToken = poolInfo.underlying_tokens[0];


    const tvlData = await checkSparkTVL(chain, poolAddress)
    if (tvlData.err) throw new Error(tvlData.err)
    const tvl = tvlData.data
    const liquidityData = await checkSparkLiquidity(chain, poolAddress)
    if (liquidityData.err) throw new Error(liquidityData.err)
    const liquidity = liquidityData.data
    const outloans = tvl - liquidity

    const dataAddress = '0xfc21d6d146e6086b8359705c8b28512a983db0cb'
    const APY = await checkSparkAPYs(chain, underlyingToken, dataAddress)

    if (APY.err) throw new Error(APY.err)
    const ActAPY = APY.data
    const RewAPY = 0
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
  url: 'https://app.sparkprotocol.io/markets/'
}
export default analyticsExport
