const pMap = require ("p-map");
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')


const SUBGRAPH_URLS = {
  optimism: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-optimism',
  avalanche:
    'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-avalanche',
  arbitrum: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum',
  polygon: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon',
  fantom: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-fantom',
  ethereum: 'https://api.thegraph.com/subgraphs/name/messari/aave-v3-ethereum',
  base: 'https://api.thegraph.com/subgraphs/name/messari/aave-v3-base'
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving

const Router = {
  optimism: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
  avalanche: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
  arbitrum: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
  polygon: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
  fantom: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
  ethereum: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2' ,
  base: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5'
}


const Distributor = {
  optimism: '0x929ec64c34a17401f460460d4b9390518e5b473e',
  avalanche:'0x929ec64c34a17401f460460d4b9390518e5b473e',
  arbitrum: '0x929ec64c34a17401f460460d4b9390518e5b473e',
  polygon: '0x929ec64c34a17401f460460d4b9390518e5b473e',
  fantom: '0x929ec64c34a17401f460460d4b9390518e5b473e',
  ethereum: '0x8164cc65827dcfe994ab23944cbc90e0aa80bfcb',
  base: '0xf9cc4F0D883F1a1eb2c253bdb46c254Ca51E1F44'
}



function poolsQuery(){
  return gql`
  {
    markets{
    id
    name
    inputToken{
      symbol
      name
      id
    }
    rewardTokens{
      id
    }
  }
}
    `
}


function poolsQueryOther(){
  return gql`
  {
    reserves{
      aToken {
        id
        rewards {
          rewardToken
        }
      }
      underlyingAsset
      name
    }
    }
    `
}

async function getPools (chain) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    let formattedPools
    let allPools
    if (chain === "ethereum" || chain === "base"){
      allPools = await request(SUBGRAPH_URL, poolsQuery())
      

      formattedPools = allPools.markets.map((pool) => {
        const rewardsTokens = pool.rewardTokens.map((reward) => reward.id)
        return {
          "name": pool.name,
          "chain": chain,
          "underlying_tokens": [pool.inputToken.id],
          "pool_address": pool.id,
          "investing_address": Router[chain],
          "staking_address": null,
          "boosting_address": null,
          "distributor_address": Distributor[chain],
          "rewards_tokens": rewardsTokens || [],
          "metadata": {
          }
        }
    })
    } else {
      allPools = await request(SUBGRAPH_URL, poolsQueryOther())
      formattedPools = allPools.reserves.map((pool) => {
        const rewardsTokens = pool.aToken.rewards.map((reward) => reward.rewardToken)

        return {
          "name": pool.name,
          "chain": chain,
          "underlying_tokens": [pool.underlyingAsset],
          "pool_address": pool.aToken.id,
          "investing_address": Router[chain],
          "staking_address": null,
          "boosting_address": null,
          "distributor_address": Distributor[chain],
          "rewards_tokens": rewardsTokens,
          "metadata": {
          }
        }
    })



    }
    
    

    return formattedPools
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

async function generatePools(){
  const allPools = await pMap(Object.keys(SUBGRAPH_URLS), async (chain)=>getPools(chain));
  return allPools.flat()
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools, null, 4)
  const relativePath = path.join(__dirname, '/generatedPools.json')
  fs.writeFileSync(relativePath, strPools)
}

updatePools()
