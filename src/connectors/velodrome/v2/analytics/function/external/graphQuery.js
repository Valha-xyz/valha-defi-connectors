const { request, gql } = require('graphql-request');
const axios = require ('axios')




export async function queryGraphData(SUBGRAPH_URL, poolAddress,block){

  const poolsQuery = gql`
  {
    liquidityPools(where: {id: "<IDHOLDER>"}, block: {number: <PLACEHOLDER>}) {
      id
      fees{
        feePercentage
      }
      cumulativeVolumeUSD
      totalValueLockedUSD
    }
  }`
  
  const poolsQueryModified = poolsQuery.replace('<IDHOLDER>',poolAddress.toLowerCase())
  const res  = await request(SUBGRAPH_URL, poolsQueryModified.replace('<PLACEHOLDER>', block))
  return res.liquidityPools
    }


export function histo(pool, dataPrior7d){
    // uni v2 forks set feeTier to constant

    console.log(pool);
    console.log(dataPrior7d);

    pool['volumeUSDPrior7d'] = dataPrior7d[0].cumulativeVolumeUSD;
    // calc 1 week volume
    pool['volumeUSD7d'] = Number(pool[0].cumulativeVolumeUSD) - Number(pool.volumeUSDPrior7d);
    // annualise volume
    pool['volumeUSDyear7d'] = pool.volumeUSD7d * 52;
    // calc fees
    pool['feeUSD7d'] = (Number(pool.volumeUSD7d) * Number(pool[0].fees[0].feePercentage)) / 100;
    // annualise
    pool['feeUSDyear7d'] = pool.feeUSD7d * 52;
    // calc apy
    pool['apy7d'] = (pool.feeUSDyear7d / pool[0].totalValueLockedUSD) * 100;

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

 
 
  
