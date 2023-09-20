const pMap = require ("p-map");
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')


const SUBGRAPH_URLS = {
  celo: "https://api.thegraph.com/subgraphs/name/dapplooker/moola-market-v2",
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Router = {
  celo: "0x970b12522CA9b4054807a2c5B736149a5BE6f670",
} ;

function poolsQuery(){
  return gql`
  {
    atokens{
      id
      underlyingAssetAddress
    }
  }
    `
}

function reservesQuery(){
  return gql`
  {
    reserves{
      id
      symbol
    }
  }
    `
}

async function getPools (chain) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    const allPools = await request(SUBGRAPH_URL, poolsQuery())
    const allReserves = await request(SUBGRAPH_URL, reservesQuery())

    console.log(allReserves)



    // We create the pools object
    const formattedPools = allPools.atokens.map((pool) => {
      return {
        "name": allReserves.reserves.map(reserve => reserve.id === pool.underlyingAssetAddress ? reserve.symbol : undefined).find(Boolean),
        "chain": chain,
        "underlying_tokens": [pool.underlyingAssetAddress],
        "pool_address": pool.id,
        "investing_address": Router[chain],
        "staking_address": null,
        "boosting_address": null,
        "distributor_address": null,
        "rewards_tokens": [],
        "metadata": {
        }
      }
    })
    return formattedPools
    console.log(formattedPools)
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
