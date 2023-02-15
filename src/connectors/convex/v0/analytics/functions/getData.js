/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkConvexData(chain, poolAddress, id) {
  try {
    let url = '';
    let poolId = '';
    if (chain === 'ethereum') {
      url = 'https://www.convexfinance.com/api/curve-apys';
      pooLId = id;
    } else if (chain === 'arbitrum') {
      url = 'https://www.convexfinance.com/api/sidechains-apys';
      poolId = 'arbitrum-' + poolAddress.toLowerCase();
    } else {
      throw new Error(
        'Error: error with Convex Indexer for APYs. Unknown chain.'
      );
    }
    const { data } = await axios.get(url);
    if (!data || !data.apys) {
      throw new Error(`Data from Flux indexer not ok for ${poolAddress}`);
    }
    let info = data.apys;
    const result = info[poolId];
    return { data: result, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkFluxData;
