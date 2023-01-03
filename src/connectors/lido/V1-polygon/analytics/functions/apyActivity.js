/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkLidoPolygonV1APY(chain, poolAddress) {
  try {
    const res = await axios.get('https://api.rocketpool.net/api/apr');
    if (!res.data || !res.data['apr']) {
      throw new Error(
        `Data from LIDO POLYGON indexer not ok for ${poolAddress}`
      );
    }
    return { data: res.data['apr'], err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkLidoPolygonV1APY;
