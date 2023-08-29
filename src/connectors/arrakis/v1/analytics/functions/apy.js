/* eslint-disable @typescript-eslint/no-var-requires */

const { queryGraphData, histo, getBlocksByTime} = require ('./external/graphQuery');


const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-mainnet",
  optimism: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-optimism",
  polygon: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-polygon",
  arbitrum: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-arbitrum"
}
func

async function checkArrakisV1APY(chain, poolAddress) {
  try {


    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];

    const query = await queryGraphData(SUBGRAPH_URL,poolAddress);

    const pool = await histo(query, query7d, "v2");


    return { data: {apy: pool.apy7d, volume: pool.volumeUSD7d}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkArrakisV1APY;
