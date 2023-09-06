const pMap = require ("p-map");
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')


const SUBGRAPH_URLS = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/morganalf/flux-finance-ethereum',
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving




function poolsQuery(){
  return gql`
  {
    pools {
      _underlying {
        id
      }
      _shareToken {
        id
        name
      }
    }
  }
    `
}


async function getPools (chain) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    
    allPools = await request(SUBGRAPH_URL, poolsQuery())
      

    formattedPools = allPools.pools.map((pool) => {
      
      return {
          "name": pool._shareToken.name,
          "chain": chain,
          "underlying_tokens": [pool._underlying.id],
          "pool_address": pool._shareToken.id,
          "investing_address": pool._shareToken.id,
          "staking_address": null,
          "boosting_address": null,
          "distributor_address": null,
          "rewards_tokens": null,
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
