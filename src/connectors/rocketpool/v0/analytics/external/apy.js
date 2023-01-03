/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkRocketV0APY(chain, poolAddress) {
  try {
    const res = await axios.get('https://api.rocketpool.net/api/apr');
    if (!res || !res['yearlyAPR']) {
      throw new Error(`Data from ROCKETPOOL indexer not ok for ${poolAddress}`);
    }
    return { data: res['yearlyAPR'], err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkRocketV0APY;
