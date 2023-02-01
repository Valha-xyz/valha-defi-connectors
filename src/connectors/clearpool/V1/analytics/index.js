/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')
const external = require('./external/DefiLlama/index')
const pools = require('../pools/pools')
const checkSharePrice = require('./functions/sharePrice')
const checkApyActivity = require('./functions/apyActivity')
const checkApyRewards = require('./functions/apyRewards')
const checkV1Liquidity = require('./functions/liquidity')
const checkV1Outloans = require('./functions/outloans')
const checkClearpoolV1Status = require('./functions/status')
const checkClearpoolV1TVL = require('./functions/tvl')

const State = {
  0: 'Active',
  1: 'Warning',
  2: 'ProvisionalDefault',
  3: 'Default',
  4: 'Closed'
}

/// APY
/// TVL
async function loadExternal () {
  const pools = await external.apy()
  if (!pools || pools.length === 0) {
    return null
  }
  return pools
}

async function analytics (chain, poolAddress) {
  const POOLS = await pools()
  if (!POOLS || POOLS.length === 0) return {}
  const externalInformation = await loadExternal()
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.pool.includes(poolAddress.toLowerCase())
  })

  let tvl = null
  if (externalInfo) {
    tvl = externalInfo.tvlUsd
  } else {
    const tvlInfo = await checkClearpoolV1TVL(chain, poolAddress)
    tvl = tvlInfo.data
  }

  const status = await checkClearpoolV1Status(chain, poolAddress)
  const sharePrice = await checkSharePrice(chain, poolAddress)
  const activity_apy = await checkApyActivity(chain, poolAddress)
  const rewards_apy = await checkApyRewards(chain, poolAddress)
  const liquidity = await checkV1Liquidity(chain, poolAddress)
  const outloans = await checkV1Outloans(chain, poolAddress)

  const ActAPY = activity_apy.data ? parseFloat(String(activity_apy.data)) : 0
  const RewAPY = rewards_apy.data ? parseFloat(String(rewards_apy.data)) : 0
  const totalAPY = ActAPY + RewAPY
  const state = status.data !== null ? State[status.data] : null

  const result = {
    status: state,
    tvl: tvl ? parseFloat(tvl) : 0,
    liquidity: parseFloat(liquidity.data),
    outloans: outloans.data,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: ActAPY,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: sharePrice.data,
    minimum_deposit: null,
    maximum_deposit: null
  }

  return result
}

module.exports = {
  main: analytics,
  url: external.url
}
