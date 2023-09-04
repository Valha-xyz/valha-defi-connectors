/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkCoinbaseAPY(chain, poolAddress) {
  try {
    const result = await axios.get(
      'https://api.exchange.coinbase.com/wrapped-assets/CBETH/'
    );
  
    const apy = Number(result.data.apy);

    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCoinbaseAPY;
