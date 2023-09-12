
const { queryGraphData, histo, getBlocksByTime} = require ('./graphQuery');

export const SUBGRAPH_URLS = {
  bsc: "https://api.thegraph.com/subgraphs/name/messari/pancakeswap-v2-swap-bsc",
}

const _ = require('lodash');
const pools = require('../../pools/pools');



async function getVolume(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });
    
    const currentTimestamp = Math.floor(Date.now() / 1000)- 200;
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
