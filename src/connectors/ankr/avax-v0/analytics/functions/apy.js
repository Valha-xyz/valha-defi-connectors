/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkAnkrAPY(chain, poolAddress) {
  try {
    const allchains = {
      bsc: 'bnb',
      eth: 'eth',
      polygon: 'polygon',
      fantom: 'ftm',
      avalanche: 'avax',
    };

    const result = await axios.get(
      'https://api.staking.ankr.com/v1alpha/metrics'
    );
    if (!result.data.services.length) {
      throw new Error(`Ankr V0: issue while checking info for ${poolAddress}`);
    }
    const poolsInfo = result.data.services.filter(
      (elem) => elem.serviceName === allchains[chain]
    );
    if (poolsInfo.length !== 1) {
      throw new Error(`Ankr V0: issue while filtering info for ${poolAddress}`);
    }

    const apy = Number(poolsInfo[0].apy);

    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAnkrAPY;
