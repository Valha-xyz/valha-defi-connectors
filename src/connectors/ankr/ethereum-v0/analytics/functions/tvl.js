/* eslint-disable @typescript-eslint/no-var-requires */

const axios = require('axios');

async function checkAnkrTVL(chain, poolAddress) {
  try {
    const allchains = {
      bsc: 'bnb',
      ethereum: 'eth',
      polygon: 'polygon',
      fantom: 'ftm',
      avalanche: 'avax'
    }

    const result = await axios.get(
      'https://api.staking.ankr.com/v1alpha/metrics',
    );
    // console.log(result.data.services.length);
    if (!result.data.services.length) {
      throw new Error(
        `Ankr V0: issue while checking info for ${poolAddress}`,
      );
    }

    const poolsInfo = result.data.services.filter(
      elem => elem.serviceName === allchains[chain],
    );
    if (poolsInfo.length !== 1) {
      throw new Error(
        `Ankr V0: issue while filtering info for ${poolAddress}`,
      );
    }

    const tvl = Number(poolsInfo[0].totalStakedUsd);

    return { data: tvl, err: null };
  }
  catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAnkrTVL;
