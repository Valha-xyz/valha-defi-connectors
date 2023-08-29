import pMap from "p-map";
import { Pool } from "src/utils/types/connector-types"
import { gql, request } from 'graphql-request'
const path = require('path')
import fs from 'fs'

const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-mainnet",
  optimism: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-optimism",
  polygon: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-polygon",
  arbitrum: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-arbitrum"
}
function poolsQuery(last_id?: string){

  return gql`
  {
    vaults {
      id
      token0 {
        name
        symbol
        address
        decimals
      }
      token1 {
        name
        symbol
        address
        decimals
      }
    }
  }
    `
}



// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Router = {
  ethereum: "0xdd92062adf9f6edf528babe7f04804fe86424a74",
  optimism: "0x9ce88a56d120300061593ef7ad074a1b710094d5",
  polygon: "0xc73fb100a995b33f9fa181d420f4c8d74506df66",
  arbitrum: "0x2845c6929d621e32b7596520c8a1e5a37e616f09",
} ;
 
async function getPools (chain: string, last_id?: string) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    const pools = await request(SUBGRAPH_URL, poolsQuery(last_id))

    // We create the pools object
    const formattedPools = pools.vaults.map((pool) : Pool => {
      return {
        "name": `${pool.token0.name} - ${pool.token1.name} LP`,
        "chain": chain,
        "underlying_tokens": [pool.token0.id, pool.token1.id],
        "pool_address": pool.id,
        "investing_address": Router[chain],
        "staking_address": null,
        "boosting_address": null,
        "distributor_address": null,
        "rewards_tokens": null,
        "metadata": {
        }
      }
    })
    console.log(formattedPools.length)
    return formattedPools
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

async function getAllPools(chain: string){
  let lastId: string;
  let allPools = []
  let newPools = []
  do{
    newPools = await getPools(chain, lastId);
    allPools = allPools.concat(newPools);
    lastId = allPools[allPools.length - 1].pool_address;
    console.log(lastId)
    console.log(allPools[allPools.length - 1])
  }while(newPools.length != 0)

  return allPools;
}

async function generatePools(){
  const allPools = await pMap(Object.keys(SUBGRAPH_URLS), async (chain)=>getAllPools(chain));
  return allPools.flat()
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools, null, 4)
  const relativePath = path.join(__dirname, '/generatedPools.json')
  fs.writeFileSync(relativePath, strPools)
}

updatePools()
