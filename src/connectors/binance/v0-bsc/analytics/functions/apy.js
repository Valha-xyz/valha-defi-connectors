/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkBinanceAPY(chain, poolAddress) {
  try {
    const result = await axios.get(
      'https://www.binance.com/bapi/earn/v1/public/pos/cftoken/project/getPurchasableProject'
    );
  
    const apy = result.data.data.annualInterestRate;

    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBinanceAPY;
