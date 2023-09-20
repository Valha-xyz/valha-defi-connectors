import axios from 'axios';
const { queryGraphData, histo, getBlocksByTime} = require ('./external/graphQuery');


const SUBGRAPH_URLS = {
  bsc: "https://api.thegraph.com/subgraphs/name/messari/alpaca-finance-lending-bsc",
}




async function checkAlpacaV1APY(chain, poolAddress) {
  try {

    const currentTimestamp = Math.floor(Date.now() / 1000) - 100;
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);

    const pools = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);

    const apy = Number(pools[0].rates[1].rate);


    // let LM = 0;
    // const { data } = await axios.get(
    //   'https://alpaca-static-api.alpacafinance.org/bsc/v1/landing/summary.json',
    // );
    // if (data.data.lendingPools.length === 0) {
    //   throw new Error(`Data from Alpaca indexer not ok for ${poolAddress}`);
    // }
    // for (const elem of data.data.lendingPools) {
    //   if (
    //     elem.ibToken.address.toLowerCase() === String(poolAddress).toLowerCase()
    //   ) {
    //     LM = elem.lendingApr;
    //   }
    // }
    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAlpacaV1APY;
