const pMap = require ("p-map");
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')


const SUBGRAPH_URLS = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/messari/spark-lend-ethereum',
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving

const Router = {
  ethereum: '0xc13e21b648a5ee794902342038ff3adab66be987'
}



function poolsQuery(){
  return gql`
  {
    markets{
      id
      name
      inputToken{
        id
      }
      rewardTokens{
        token{
          id
        }
      }
    }
  }
    `
}


async function getPools (chain) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    
    allPools = await request(SUBGRAPH_URL, poolsQuery())
      

    formattedPools = allPools.markets.map((pool) => {
        const rewardsTokens = pool.rewardTokens.map((reward) => reward.token.id)
        return {
          "name": pool.name,
          "chain": chain,
          "underlying_tokens": [pool.inputToken.id],
          "pool_address": pool.id,
          "investing_address": Router[chain],
          "staking_address": null,
          "boosting_address": null,
          "distributor_address": null,
          "rewards_tokens": rewardsTokens || [],
          "metadata": {
          }
        }
    })
    
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
