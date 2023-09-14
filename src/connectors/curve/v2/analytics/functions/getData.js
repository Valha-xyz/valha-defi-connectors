/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const _ = require('lodash');

function checkAPIType(id) {
  if (id.includes('factory-crypto')) {
    return 'factory-crypto';
  } else if (id.includes('factory')) {
    return 'factory';
  } else if (id.includes('crypto')) {
    return 'crypto';
  } else {
    return 'main';
  }
}

async function getData(chain, poolAddress, id) {
  try {
    const type = checkAPIType(id);
    const URL = `https://api.curve.fi/api/getPools/${chain}/${type}`;
    const res = await axios.get(URL);
    if (!res.data.success)
      throw new Error(`Data from Curve V2 indexer not ok for ${poolAddress}`);
    const info = res.data.data.poolData;
    const poolInfo = _.find(info, (elem) => {
      return elem.id.toLowerCase() === id.toLowerCase();
    });
    if (!poolInfo || (poolInfo && !poolInfo.usdTotal))
      throw new Error(`Data from Curve V2 indexer not ok for ${poolAddress}`);
    return {
      data: poolInfo,
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getData;
