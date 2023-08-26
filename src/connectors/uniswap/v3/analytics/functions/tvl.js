/* eslint-disable @typescript-eslint/no-var-requires */
const {queryGraphData, getBlocksByTime} = require ('./external/graphQuery');

const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  optimism: "https://api.thegraph.com/subgraphs/name/optimism-post-regenesis",
  avalanche:"https://api.thegraph.com/subgraphs/name/uniswap-v3-avax",
  arbitrum: "https://api.thegraph.com/subgraphs/name/arbitrum-dev",
  polygon: "https://api.thegraph.com/subgraphs/name/uniswap-v3-polygon",
  celo: "https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo",
};

async function checkUniV3TVL(chain, poolAddress) {
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    

    // We get the current pool inside this big array
    const TVL = Number(query[0].totalValueLockedUSD);

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkUniV3TVL;
