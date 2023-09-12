const { request, gql } = require('graphql-request');
const axios = require ('axios')

export async function queryGraphData(SUBGRAPH_URL, poolAddress,block){

  const poolsQuery = gql`
            { pairs(where: { id: "<IDHOLDER>" }, orderBy: trackedReserveETH, orderDirection: desc block: {number: <PLACEHOLDER>}) {
                id
                reserve0
                reserve1
                reserveUSD
                volumeUSD
                token0 {
                  symbol
                  id
                }
                token1 {
                  symbol
                  id
                }
              }
            }`
  
  const poolsQueryModified = poolsQuery.replace('<IDHOLDER>',poolAddress)
  const res  = await request(SUBGRAPH_URL, poolsQueryModified.replace('<PLACEHOLDER>', block))
  return res.pairs
    }


export function histo(pool, dataPrior7d, version){
    // uni v2 forks set feeTier to constant
    if (version === 'v2') {
      pool['feeTier'] = 3000;
    } else if (version === 'stellaswap') {
      pool['feeTier'] = 2000;
    } else if (version === 'baseswap') {
      pool['feeTier'] = 1700;
    } else if (version === 'zyberswap') {
      pool['feeTier'] = 1500;
    } else if (version === 'arbidex') {
      pool['feeTier'] = 500;
    }
    pool['volumeUSDPrior7d'] = dataPrior7d[0].volumeUSD;
    // calc 1 week volume
    pool['volumeUSD7d'] = Number(pool[0].volumeUSD) - Number(pool.volumeUSDPrior7d);
    // annualise volume
    pool['volumeUSDyear7d'] = pool.volumeUSD7d * 52;
    // calc fees
    pool['feeUSD7d'] = (Number(pool.volumeUSD7d) * Number(pool.feeTier)) / 1e6;
    // annualise
    pool['feeUSDyear7d'] = pool.feeUSD7d * 52;
    // calc apy
    pool['apy7d'] = (pool.feeUSDyear7d / pool[0].reserveUSD) * 100;

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

 
  
