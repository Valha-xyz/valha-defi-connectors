
const fs = require('fs')
const path = require('path')
const axios = require('axios');


const INVESTING_ADDRESS = '0x77784f96C936042A3ADB1dD29C91a55EB2A4219f'

let pools = []

async function generatePools () {
  const URL = `https://api-mainnet.solidly.com/api/v1/pairs`
  const res = await axios.get(URL)
    if (!res.data.success) {
      throw new Error('Error while getting data from Solidly API')
    }

  const info = res.data.data
  pools = [...pools, ...info]

  if (!pools || pools.length === 0) {
    return null
  }

  console.log(pools)

  const modifiedPools = pools.map((elem) => {
    return {
      name: elem.symbol,
      chain: 'ethereum',
      underlying_tokens: [elem.token0.address, elem.token1.address],
      pool_address: elem.address,
      investing_address: INVESTING_ADDRESS,
      staking_address: elem.gauge ? elem.gauge.address : null,
      boosting_address: null,
      distributor_address: elem.gauge ? elem.gauge.address : null,
      rewards_tokens: elem.gauge ? elem.gauge.rewardTokens.map(token => token.token.address) : null,
      metadata: {}
    }
  })
  return modifiedPools
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools)
  const relativePath = path.join(__dirname, '/generatedPools.js')
  const content = `
  const POOLS = ${strPools};

  module.exports = POOLS;
  `
  fs.writeFileSync(relativePath, content)
}

updatePools()