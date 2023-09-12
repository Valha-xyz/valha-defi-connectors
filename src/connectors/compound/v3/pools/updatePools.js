const pMap = require ("p-map");
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')


const SUBGRAPH_URLS = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-ethereum',
  base: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-base',
  arbitrum: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-arbitrum',
  polygon: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-polygon',
}


const Distributor = {
  ethereum: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
  base: '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1',
  arbitrum: '0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae',
  polygon: '0x45939657d1CA34A8FA39A924B71D28Fe8431e581',
}

// const Comet = {
//   ethereum: '0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779',
//   base: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
//   arbitrum: '0xD10b40fF1D92e2267D099Da3509253D9Da4D715e',
//   polygon: '0xd712ACe4ca490D4F3E92992Ecf3DE12251b975F9',
// }




function poolsQuery(){
  return gql`
  {
    markets{
      id
      name
      exchangeRate
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
    
    allPools = await request(SUBGRAPH_URL, poolsQuery());

    const filteredMarkets = allPools.markets.filter((market) => market.exchangeRate !== null);

    
    formattedPools = filteredMarkets.map((pool) => {
        const rewardsTokens = pool.rewardTokens.map((reward) => reward.token.id)
        const uniqueRewardsTokens = [...new Set(rewardsTokens)];
        return {
          "name": pool.name,
          "chain": chain,
          "underlying_tokens": [pool.inputToken.id],
          "pool_address": pool.id.substr(0, 42),
          "investing_address": pool.id.substr(0, 42),
          "staking_address": null,
          "boosting_address": null,
          "distributor_address": Distributor[chain],
          "rewards_tokens": uniqueRewardsTokens || [],
          "metadata": {}
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
