const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')


const baseURL = 'https://api.thegraph.com/subgraphs/name/morpho-labs/morphocompoundmainnet'
const investingAddress = "0x8888882f8f843896699869179fb6e4f7e3b58888"
const rewardToken = '0xc00e94cb662c3520282e6f5717214004a7f26888'.toLowerCase();
  
const poolsQuery = gql`
query GetYieldsData {
  markets(first: 128) {
    address
    symbol
    token {
      address
      decimals
      symbol
    }
  }
}
`
let pools = []

async function generatePools (poolsQuery) {
    
    const res = await request(baseURL, poolsQuery)

    // console.log(res.markets)

    const info = res.markets
    pools = [...pools, ...info]
        
    if (!pools || pools.length === 0) {
        return null
    }

  const modifiedPools = pools.map((elem) => {
    return {
      name: elem.symbol,
      chain: "ethereum",
      underlying_tokens: [elem.token.address],
      pool_address: elem.address,
      investing_address: investingAddress,
      staking_address: null,
      boosting_address: null,
      distributor_address: null,
      rewards_tokens: [rewardToken],
      metadata: {}
    }
  })
  return modifiedPools
}

async function updatePools (poolsQuery) {
  const pools = await generatePools(poolsQuery)
  const strPools = JSON.stringify(pools)
  const relativePath = path.join(__dirname, '/generatedPools.js')
  const content = `
  const POOLS = ${strPools};

  module.exports = POOLS;
  `
  fs.writeFileSync(relativePath, content)
}

updatePools(poolsQuery)