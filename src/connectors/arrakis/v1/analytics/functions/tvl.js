/* eslint-disable @typescript-eslint/no-var-requires */
const {queryGraphData, getBlocksByTime} = require ('./external/graphQuery');


const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v2-dev",
}
async function checkArrakisV1TVL(chain, poolAddress) {
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000) - 100;

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    

    // We get the current pool inside this big array
    const TVL = Number(query[0].reserveUSD);

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkArrakisV1TVL;
