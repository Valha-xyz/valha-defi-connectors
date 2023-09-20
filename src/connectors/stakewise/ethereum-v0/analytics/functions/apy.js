/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkStakewiseAPY(chain, poolAddress) {
  try {
    const result = await axios.get(
      'https://api.stakewise.io/pool-stats/?network=mainnet'
    );
    
    const fee = 0.1;
    const apy = result.data.validators_apr * (1-fee) ; 

    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStakewiseAPY;
