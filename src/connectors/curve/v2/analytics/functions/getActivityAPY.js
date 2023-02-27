/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const _ = require('lodash');

async function getActivityAPY(chain, poolAddress) {
  try {
    const URL = `https://api.curve.fi/api/getSubgraphData/${chain}`;
    const res = await axios.get(URL);
    if (!res.data.success)
      throw new Error(`Data from Curve V2 indexer not ok for ${poolAddress}`);
    const info = res.data.data.poolList;
    const poolInfo = _.find(info, (elem) => {
      return elem.address.toLowerCase() === poolAddress.toLowerCase();
    });
    if (!poolInfo || (poolInfo && !poolInfo.latestWeeklyApy))
      throw new Error(`Data from Curve V2 indexer not ok for ${poolAddress}`);
    return {
      data: poolInfo.latestWeeklyApy,
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getActivityAPY;
