const pMap = require ("p-map");
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')


const SUBGRAPH_URLS = {
  optimism: 'https://api.thegraph.com/subgraphs/name/messari/stargate-optimism',
  avalanche:
    'https://api.thegraph.com/subgraphs/name/messari/stargate-avalanche',
  arbitrum: 'https://api.thegraph.com/subgraphs/name/messari/stargate-arbitrum',
  polygon: 'https://api.thegraph.com/subgraphs/name/messari/stargate-polygon',
  fantom: 'https://api.thegraph.com/subgraphs/name/messari/stargate-fantom',
  ethereum: 'https://api.thegraph.com/subgraphs/name/messari/stargate-ethereum',
  base: 'https://api.thegraph.com/subgraphs/name/messari/stargate-base'
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving

const Router = {
  optimism: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
  avalanche: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  arbitrum: '0x53bf833a5d6c4dda888f69c22c88c9f356a41614',
  polygon: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  fantom: '0x45a01e4e04f14f7a4a6702c74187c5f6222033cd',
  ethereum: '0x8731d54e9d02c286767d56ac03e8037c07e01e98' ,
  base: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
  bsc: '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8' ,
}


const Staking = {
  optimism: '0x4DeA9e918c6289a52cd469cAC652727B7b412Cd2',
  avalanche:'0x8731d54E9D02c286767d56ac03e8037C07e01e98',
  arbitrum: '0xeA8DfEE1898a7e0a59f7527F076106d7e44c2176',
  polygon: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
  fantom: '0x224D8Fd7aB6AD4c6eb4611Ce56EF35Dec2277F03',
  ethereum: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
  base: '0x06Eb48763f117c7Be887296CDcdfad2E4092739C',
  bsc: '0x3052A0F6ab15b4AE1df39962d5DdEFacA86DaB47',
}



function poolsQuery(){
  return gql`
  {
    pools{
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
      

    formattedPools = allPools.pools.map((pool) => {
        const rewardsTokens = pool.rewardTokens.map((reward) => reward.token.id)
        return {
          "name": pool.name,
          "chain": chain,
          "underlying_tokens": [pool.inputToken.id],
          "pool_address": pool.id,
          "investing_address": Router[chain],
          "staking_address": Staking[chain],
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
