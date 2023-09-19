const { request, gql } = require('graphql-request');
const axios = require ('axios')

export async function queryGraphData(SUBGRAPH_URL, poolAddress,block){

  const poolsQuery = gql`
            {
              markets(where: { id: "<IDHOLDER>" }, block: {number: <PLACEHOLDER>}) {
                id
                rates {
                  id
                  rate
                }
                rewardTokenEmissionsUSD
                exchangeRate
                totalValueLockedUSD
                
              }
            }  `
  
  const poolsQueryModified = poolsQuery.replace('<IDHOLDER>',poolAddress)
  const res  = await request(SUBGRAPH_URL, poolsQueryModified.replace('<PLACEHOLDER>', block))
  return res.markets
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

 
  
