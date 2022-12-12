/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkLidoV0APY() {
  try {
    const { data } = await axios.get('https://stake.lido.fi/api/steth-apr');
    const result = parseFloat(data);
    if (result && result > 0) {
      return { data: result, err: null };
    }
    throw new Error('No APY found for Lido pool');
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkLidoV0APY;
