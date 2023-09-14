/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const _ = require('lodash');

const { queryGraphData, histo, getBlocksByTime} = require ('./external/graphQuery');



export const SUBGRAPH_URLS = {
  optimism: "https://api.thegraph.com/subgraphs/name/messari/curve-finance-optimism",
  ethereum: "https://api.thegraph.com/subgraphs/name/messari/curve-finance-ethereum",
  arbitrum: "https://api.thegraph.com/subgraphs/name/messari/curve-finance-arbitrum",
  polygon: "https://api.thegraph.com/subgraphs/name/messari/curve-finance-polygon",
  avalanche: "https://api.thegraph.com/subgraphs/name/messari/curve-finance-avalanche"
}



async function getVolume(chain, poolAddress) {
  try {
    
    const currentTimestamp = Math.floor(Date.now() / 1000)- 100;
    const timestamp7d = currentTimestamp - (7 * 24 * 60 * 60);

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const block7d =  await getBlocksByTime(timestamp7d,chain);

    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    const query7d = await queryGraphData(SUBGRAPH_URL,poolAddress,block7d);
    const pool = await histo(query, query7d);



    return {
      data:  { 
        volume: pool.volumeUSDyear7d || 0, 
        fee: pool.feeUSDyear7d || 0 },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getVolume;
