/* eslint-disable @typescript-eslint/no-var-requires */

const axios = require('axios');

async function checkAnkrTVL(chain, poolAddress) {
  try {
    const allchains = {
      bsc: 'bnb',
      eth: 'eth',
      polygon: 'polygon',
      fantom: 'ftm',
      avalanche: 'avax'
    }

    const res = await axios.get('https://api.staking.ankr.com/v1alpha/metrics');
    const data = await res.services.filter((elem) => elem.serviceName === allchains[chain]).totalStakedUsd
    return { data, err: null };
  }
  catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAnkrTVL;
