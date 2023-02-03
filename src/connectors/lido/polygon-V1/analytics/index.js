/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')
const external = require('./external/DefiLlama/index')
const pools = require('../pools/pools')
const checkLidoPolygonV1APY = require('./functions/apyActivity')
const checkLidoPolygonV1TVL = require('./functions/tvl')
const checkLidoPolygonV1Shareprice = require('./functions/sharePrice')

async function analytics (chain, poolAddress) {
  const apy = await checkLidoPolygonV1APY(chain, poolAddress)
  if (apy.err) throw new Error(apy.err)
  const activity_apy = parseFloat(String(apy.data))
  const TVL = await checkLidoPolygonV1TVL(chain, poolAddress)
  if (TVL.err) throw new Error(TVL.err)
  const shareprice = await checkLidoPolygonV1Shareprice(chain, poolAddress)
  if (shareprice.err) throw new Error(shareprice.err)

  const result = {
    status: null,
    tvl: TVL.data,
    liquidity: 0,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: activity_apy,
    activity_apy,
    rewards_apy: 0,
    boosting_apy: 0,
    share_price: shareprice.data,
    minimum_deposit: null,
    maximum_deposit: null
  }

  return result
}

module.exports = {
  main: analytics,
  url: external.url
}
