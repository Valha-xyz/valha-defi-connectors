/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')
const external = require('./external/DefiLlama/index')
const pools = require('../pools/pools')
const checkSharePrice = require('./functions/sharePrice')
const checkApyActivity = require('./functions/apyActivity')
// const checkApyRewards = require('./functions/apyRewards');
const checkV1Liquidity = require('./functions/liquidity')
const checkV1Outloans = require('./functions/outloans')
const checkRibbonV1Status = require('./functions/status')
const checkRibbonV1TVL = require('./functions/tvl')

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

  const tvl = await checkRibbonV1TVL(chain, poolAddress)
  const status = await checkRibbonV1Status(chain, poolAddress)
  const sharePrice = await checkSharePrice(chain, poolAddress)
  const activity_apy = await checkApyActivity(chain, poolAddress)
  // const rewards_apy = await checkApyRewards(chain, poolAddress);
  const liquidity = await checkV1Liquidity(chain, poolAddress)
  const outloans = await checkV1Outloans(chain, poolAddress)

  const TVL = tvl.data ? parseFloat(String(tvl.data)) : 0
  const ActAPY = activity_apy.data ? parseFloat(String(activity_apy.data)) : 0
  // const RewAPY = rewards_apy.data ? parseFloat(String(rewards_apy.data)) : 0;
  const totalAPY = ActAPY
  const state = status.data !== null ? State[status.data] : null

  const result = {
    status: state,
    tvl: TVL,
    liquidity: liquidity.data,
    outloans: outloans.data,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: ActAPY,
    rewards_apy: 0,
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
