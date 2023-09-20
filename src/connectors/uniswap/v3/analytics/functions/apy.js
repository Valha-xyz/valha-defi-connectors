/* eslint-disable @typescript-eslint/no-var-requires */

const { queryGraphData, histo, getBlocksByTime} = require ('./external/graphQuery');


const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  optimism: "https://api.thegraph.com/subgraphs/name/optimism-post-regenesis",
  avalanche:"https://api.thegraph.com/subgraphs/name/uniswap-v3-avax",
  arbitrum: "https://api.thegraph.com/subgraphs/name/arbitrum-dev",
  polygon: "https://api.thegraph.com/subgraphs/name/uniswap-v3-polygon",
  celo: "https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo",
}

async function checkUniV3APY(chain, poolAddress) {
  try {

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const timestamp7d = currentTimestamp - (7 * 24 * 60 * 60);

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const block7d =  await getBlocksByTime(timestamp7d,chain);


    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    const query7d = await queryGraphData(SUBGRAPH_URL,poolAddress,block7d);

    const pool = await histo(query, query7d, "v3");


    return { data: {apy: pool.apy7d, volume: pool.volumeUSDyear7d, fee: pool.feeUSDyear7d}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkUniV3APY;
