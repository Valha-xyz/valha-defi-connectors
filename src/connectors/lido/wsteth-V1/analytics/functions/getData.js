/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkLidoV0Data() {
  try {
    const apr = await axios.get('https://stake.lido.fi/api/sma-steth-apr');
    const tvl = await axios.get('https://stake.lido.fi/api/short-lido-stats');

    const aprData = parseFloat(apr.data);
    const tvlData = tvl.data.marketCap;
    
    
    return { data: {apr: aprData, tvl: tvlData}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkLidoV0Data;
