/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkSwellAPY(chain, poolAddress) {
  try {
    const result = await axios.get(
      'https://v3.svc.swellnetwork.io/api/tokens/sweth/apr'
    );
  
    const apy = result.data

    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkSwellAPY;
