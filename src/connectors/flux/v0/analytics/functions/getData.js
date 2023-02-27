/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkFluxData(chain, poolAddress) {
  try {
    const { data } = await axios.get(
      'https://ondo.finance/api/lending/markets',
    );
    if (!data) {
      throw new Error(`Data from Flux indexer not ok for ${poolAddress}`);
    }
    for (const elem of data) {
      if (elem.address.toLowerCase() === poolAddress.toLowerCase()) {
        return elem;
      }
    }
    throw new Error(`Data from Flux indexer not ok for ${poolAddress}`);
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkFluxData;
