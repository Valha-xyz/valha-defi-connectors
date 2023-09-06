/* eslint-disable @typescript-eslint/no-var-requires */
const pMap = require ("p-map");
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')



const SUBGRAPH_URLS = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/messari/convex-finance-ethereum',
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving

const Router = {
  ethereum: '0xf403c135812408bfbe8713b5a23a04b3d48aae31'
}



function poolsQuery(){
  return gql`
  {
    vaults{
      name
      _crvRewards
      _lpToken
      
      rewardTokens{
        token{id}
      }
      outputToken {
        id
      }
    }
  }
    `
}


async function getPools (chain) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    
    allPools = await request(SUBGRAPH_URL, poolsQuery())
      

    formattedPools = allPools.vaults.map((pool) => {
        const rewardsTokens = pool.rewardTokens.map((reward) => reward.token.id)
        return {
          "name": "CVX - " + pool.name,
          "chain": chain,
          "underlying_tokens": [pool._lpToken],
          "pool_address": pool.outputToken.id,
          "investing_address": Router[chain],
          "staking_address": pool._crvRewards,
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
