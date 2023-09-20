/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function getPancakeActAPY(chain, poolAddress) {
  try {
    const { data } = await axios.get(
      'https://raw.githubusercontent.com/pancakeswap/pancake-frontend/develop/apps/web/src/config/constants/lpAprs/56.json'
    );
    if (!data[poolAddress] || !data) {
      throw new Error(`Data from Pancake indexer not ok for ${poolAddress}`);
    }
    const activity_apy = data[poolAddress];
    return {
      data: activity_apy,
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getPancakeActAPY;
