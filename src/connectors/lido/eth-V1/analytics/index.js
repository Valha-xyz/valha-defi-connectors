/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')
const external = require('./external/DefiLlama/index')
const pools = require('../pools/pools')
const checkApyActivity = require('./functions/apyActivity')

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
  if (!externalInformation) return {}
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.pool.includes(poolAddress.toLowerCase())
  })

  const tvl = externalInfo.tvlUsd
  const activity_apy = externalInfo.apyBase

  const result = {
    status: null,
    tvl,
    liquidity: 0,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: parseFloat(String(activity_apy)),
    activity_apy,
    rewards_apy: 0,
    boosting_apy: null,
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null
  }

  console.log(result)

  return result
}

module.exports = {
  main: analytics,
  url: external.url
}
