async function analytics (chain, poolAddress) {
  const tvl = 0

  const result = {
    status: null,
    tvl: 10,
    liquidity: 10,
    outloans: 10,
    losses: null,
    capacity: 5,
    apy: 5.5,
    activity_apy: 3,
    rewards_apy: 2.5,
    boosting_apy: 0,
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null
  }

  return result
}

module.exports = {
  main: analytics,
  url: external.url
}
