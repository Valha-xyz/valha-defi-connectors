import pMap from "p-map";
import { Pool } from "src/utils/types/connector-types"
import { gql, request } from 'graphql-request'
const path = require('path')
import fs from 'fs'


export const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2",
  polygon:"https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2",
  arbitrum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2",
}

export const GAUGE_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges",
  polygon:"https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-polygon",
  arbitrum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-arbitrum",
}


function poolsQuery(last_id?: string){

  //filter pools on type = 2 and remove aave boosted pools and bb-a ones.

  let lastIdCondition = `where: { id_gt: "${last_id}" , totalLiquidity_gt: "500000", strategyType: 2 }`
  if(last_id == undefined){
    lastIdCondition = "";
  }

  return gql`
      query Query{
        pools(first: 1000 ${lastIdCondition}){
          address
          name
          poolType
          tokensList
          strategyType
          tokens {
            address
            balance
            symbol
            weight
            }
        }
    `
}


function poolsGauge(last_id?: string){

  //filter pools on type = 2 and remove aave boosted pools and bb-a ones.

  let lastIdCondition = `where: { id_gt: "${last_id}"}`
  if(last_id == undefined){
    lastIdCondition = "";
  }

  return gql`
      query Query{
        liquidityGauges(first: 1000 ${lastIdCondition}){
        id
        symbol
        pool {
          id
        }
    }
  }
    `
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Router = {
  ethereum: "0xba12222222228d8ba445958a75a0704d566bf2c8",
} ;
 
async function getPools (chain: string, last_id?: string) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    const pools = await request(SUBGRAPH_URL, poolsQuery(last_id))

    // We create the pools object
    const formattedPools = pools.pools.map((pool) : Pool => {
      return {
        "name": pool.name,
        "chain": chain,
        "underlying_tokens": pool.tokensList,
        "pool_address": pool.address,
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
