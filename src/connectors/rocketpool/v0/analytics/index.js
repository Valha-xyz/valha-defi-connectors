/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')
const pools = require('../pools/pools')
const checkRocketV0Status = require('./external/status')
const checkRocketV0TVL = require('./external/tvl')
const checkRocketV0Liquidity = require('./external/liquidity')
const checkRocketV0SharePrice = require('./external/shareprice')
const checkRocketV0Minimum = require('./external/minimum')
const checkRocketV0Maximum = require('./external/maximum')
const checkRocketV0APY = require('./external/apy')

async function analytics (chain, poolAddress) {
  try {
    const SETTING_ADDRESS = '0xCc82C913B9f3a207b332d216B101970E39E59DB3'

    const POOLS = await pools()
    if (!POOLS || POOLS.length === 0) return {}

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase()
    })

    const investing_address = poolInfo.investing_address

    const TVL = await checkRocketV0TVL(chain, poolAddress)
    if (TVL.err) throw new Error(TVL.err)
    const apy = await checkRocketV0APY(chain, poolAddress)
    if (apy.err) throw new Error(apy.err)
    const shareprice = await checkRocketV0SharePrice(chain, poolAddress)
    if (shareprice.err) throw new Error(shareprice.err)
    const liquidity = await checkRocketV0Liquidity(chain, investing_address)
    if (liquidity.err) throw new Error(liquidity.err)
    const status = await checkRocketV0Status(chain, SETTING_ADDRESS)
    if (status.err) throw new Error(status.err)
    const minimum = await checkRocketV0Minimum(chain, SETTING_ADDRESS)
    if (minimum.err) throw new Error(minimum.err)
    const maximum = await checkRocketV0Maximum(chain, SETTING_ADDRESS)
    if (maximum.err) throw new Error(maximum.err)
    const parsedAPY = parseFloat(apy.data)

    const result = {
      status: status.data,
      tvl: TVL.data,
      liquidity: liquidity.data,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: parsedAPY,
      activity_apy: parsedAPY,
      rewards_apy: 0,
      boosting_apy: 0,
      share_price: shareprice.data,
      minimum_deposit: minimum.data,
      maximum_deposit: maximum.data
    }
    return result
  } catch (err) {
    console.log(err)
    return {}
  }
}

module.exports = {
  main: analytics,
  url: 'https://stake.rocketpool.net/'
}
