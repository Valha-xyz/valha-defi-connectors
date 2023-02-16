/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const pools = require('../../../../../curve/v2/pools/pools');
const _ = require('lodash');

async function checkConvexData(chain, poolAddress) {
  try {
    // Get right underlying ID from Curve for the API
    const POOLS = await pools();
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });
    if (!poolInfo)
      throw new Error(`Data from Convex V0 indexer not ok for ${poolAddress}`);
    const id = poolInfo.metadata.id;
    //Get URL Data
    const URL = 'https://www.convexfinance.com/api/curve-apys';
    const { data } = await axios.get(URL);
    if (!data || !data.apys) {
      throw new Error(`Data from Convex V0 indexer not ok for ${poolAddress}`);
    }
    let info = data.apys;
    const result = info[id];
    return { data: result, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkConvexData;
