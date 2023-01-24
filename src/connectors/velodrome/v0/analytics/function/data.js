/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkVelodromeV0Data(chain, poolAddress) {
  try {
    const result = await axios.get(
      'https://api.velodrome.finance/api/v1/pairs'
    );
    if (!result.data.data.length) {
      throw new Error(
        `VELODROME V0: issue while checking info for ${poolAddress}`
      );
    }
    const poolsInfo = result.data.data.filter(
      (elem) => elem.address.toLowerCase() === poolAddress.toLowerCase()
    );
    if (poolsInfo.length !== 1) {
      throw new Error(
        `VELODROME V0: issue while filtering info for ${poolAddress}`
      );
    }
    const poolInfo = poolsInfo[0];
    const tvl = poolInfo.tvl;
    const apy = poolInfo.apr;
    console.log(tvl);
    console.log(apy);
    return {
      data: {
        tvl: tvl ? tvl : 0,
        rewards_apy: apy ? apy : 0,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkVelodromeV0Data;
