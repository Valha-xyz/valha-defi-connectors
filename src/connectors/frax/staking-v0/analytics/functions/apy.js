/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkFraxAPY(chain, poolAddress) {
  try {
    const result = await axios.get(
      'https://api.frax.finance/v2/frxeth/summary/latest'
    );
    
    
    const apy = result.data.sfrxethApr ; 

    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkFraxAPY;
