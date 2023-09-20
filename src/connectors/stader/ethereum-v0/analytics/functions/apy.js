/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkStaderAPY(chain, poolAddress) {
  try {
    const result = await axios.get(
      'https://universe.staderlabs.com/eth/apy'
    );
  
    const apy = result.data.value

    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStaderAPY;
