/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const pools = require('../../../../curve/v2/pools/pools');
const _ = require('lodash');

async function checkConvexData(chain, poolAddress, curveID) {
  try {
    //Get URL Data
    const URL = 'https://www.convexfinance.com/api/curve-apys';
    const { data } = await axios.get(URL);
    if (!data || !data.apys) {
      throw new Error(`Data from Convex V0 indexer not ok for ${poolAddress}`);
    }
    let info = data.apys;
    const result = info[curveID];
    return { data: result, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkConvexData;
