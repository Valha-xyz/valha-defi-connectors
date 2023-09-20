/* eslint-disable @typescript-eslint/no-var-requires */
const {queryGraphData, getBlocksByTime} = require ('./external/graphQuery');
import { SUBGRAPH_URLS, GAUGE_URLS} from './external/graphQuery'



async function checkBalancerV2TVL(chain, poolAddress) {
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000) - 100;

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);

    // We get the current pool inside this big array
    const TVL = Number(query[0].totalLiquidity);

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBalancerV2TVL;
