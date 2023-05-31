/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkAnkrAPY(chain, poolAddress) {
  try {
    const allchains = {
      bsc: 'bnb',
      eth: 'eth',
      polygon: 'polygon',
      fantom: 'ftm'
    }

    const res = await axios.get('https://api.staking.ankr.com/v1alpha/metrics');

    console.log(allchains[chain]);
    const data = await res.services.filter((elem) => elem.serviceName === allchains[chain]).apy;
    console.log(data);
    return {  data , err: null};
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAnkrAPY;
