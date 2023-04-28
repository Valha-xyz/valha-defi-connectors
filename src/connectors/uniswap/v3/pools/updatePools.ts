import pMap from "p-map";
import { Pool } from "src/utils/types/connector-types"
import { gql, request } from 'graphql-request'
const path = require('path')
import fs from 'fs'

const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  /*optimism: '',
  avalanche:'',
  arbitrum: '',
  polygon: '',
  fantom: ''
  */
}
function poolsQuery(last_id?: string){

  let lastIdCondition = `where: { id_gt: "${last_id}" }`
  if(last_id == undefined){
    lastIdCondition = "";
  }

  return gql`
      query Query{
        pools(first: 1000 ${lastIdCondition}){
          id
          
          token0{
            id
            name
          }
          token1{
            id
            name
          }
          feeTier
        }
      }
    `
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const NFTPositionManager = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
 
async function getPools (chain: string, last_id?: string) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain]
    const pools = await request(SUBGRAPH_URL, poolsQuery(last_id))

    // We create the pools object
    const formattedPools = pools.pools.map((pool) : Pool => {
      return {
        "name": `${pool.token0.name} - ${pool.token1.name} LP`,
        "chain": chain,
        "underlying_tokens": [pool.token0.id, pool.token1.id],
        "pool_address": pool.id,
        "investing_address": NFTPositionManager,
        "staking_address": null,
        "boosting_address": null,
        "distributor_address": null,
        "rewards_tokens": null,
        "metadata": {
          fee: pool.feeTier
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
