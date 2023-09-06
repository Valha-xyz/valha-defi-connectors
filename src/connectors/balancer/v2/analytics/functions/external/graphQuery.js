const { request, gql } = require('graphql-request');
const axios = require ('axios')


export const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2",
  polygon:"https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2",
  arbitrum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2",
  optimism: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-optimism-v2",
}

export const GAUGE_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges",
  polygon:"https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-polygon",
  arbitrum: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-arbitrum",
  optimism: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-optimism"
}

// totalLiquidity is TVL in USD for most pools (type: weighted) but we need to get rid of balancer aave pools
// also excludes all the pools with bb-a or boosted aave in pools name


export async function queryGraphData(SUBGRAPH_URL, poolAddress,block){

  const poolsQuery = gql`
           {
              pools(where: { address: "<IDHOLDER>" }, orderDirection: desc block: {number: <PLACEHOLDER>}) {
                address
                tokensList
                totalSwapFee
                swapFee
                totalShares
                totalLiquidity
                totalSwapVolume
                tokens {
                  address
                  balance
                  symbol
                  weight
                }
              }
            }`
  
  const poolsQueryModified = poolsQuery.replace('<IDHOLDER>',poolAddress)
  const res  = await request(SUBGRAPH_URL, poolsQueryModified.replace('<PLACEHOLDER>', block))
  return res.pools
    }

export async function queryGaugeData(GAUGE_URL, stakingAddress,block){

      const poolsQuery = gql
      `{
        liquidityGauges(where: { id: "<IDHOLDER>" }, orderDirection: desc block: {number: <PLACEHOLDER>}) {
          id
          symbol
          poolId
          totalSupply
          factory {
            id
          }
          tokens {
            id
            symbol
            decimals
          }
        }
      }`
      
      const poolsQueryModified = poolsQuery.replace('<IDHOLDER>',stakingAddress)
      const res  = await request(SUBGRAPH_URL, poolsQueryModified.replace('<PLACEHOLDER>', block))
      return res.liquidityGauges
        }
        

export function histo(pool, dataPrior7d, swapFeePercentage){

    // calc 7days volume
    pool['volumeUSD7d'] = Number(pool[0].totalSwapVolume) - Number(dataPrior7d[0].totalSwapVolume);
    // calc fees
    pool['feeUSD7d'] = Number(pool[0].totalSwapFee) - Number(dataPrior7d[0].totalSwapFee);
    // annualise
    pool['feeUSDyear7d'] = pool.feeUSD7d * 52
    // calc apy
    pool['apy7d'] = swapFeePercentage * (pool.feeUSDyear7d / pool[0].totalLiquidity) * 100;
    pool['volume7d'] = pool.volumeUSD7d * 52;

    return pool;
  }

export async function getBlocksByTime(timestamp, chainString){
    try {
      const chain = chainString === 'avalanche' ? 'avax' : chainString;
      const response = await axios.get(`https://coins.llama.fi/block/${chain}/${timestamp}`)
      return response.data.height
    }
    catch (err) {
      console.log(err);
      return { data: null, err };
    }
  }

 
  
