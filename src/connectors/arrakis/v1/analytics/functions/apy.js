/* eslint-disable @typescript-eslint/no-var-requires */

const { queryGraphData, histo, getBlocksByTime} = require ('./external/graphQuery');


const SUBGRAPH_URLS = {
  ethereum: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-mainnet",
  optimism: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-optimism",
  polygon: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-polygon",
  arbitrum: "https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-arbitrum"
}

async function checkArrakisV1APY(chain, poolAddress) {
  try {


    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];

    const vault = await queryGraphData(SUBGRAPH_URL,poolAddress);

    const activityApr = vault[0].apr.averageApr;
    
    return { data: {apy: Number(activityApr)}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkArrakisV1APY;
