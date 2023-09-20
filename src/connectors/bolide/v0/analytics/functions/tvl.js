/* eslint-disable @typescript-eslint/no-var-requires */

const axios = require ('axios');

const URL = 'https://bolide.fi/api/v1/vaults/list'

async function checkBolideTVL(chain, poolAddress) {
  try {

    const result = await axios.get(URL);
    
    const poolWithAddress = result.data.vaults.find(vault => vault.address === poolAddress);
    const tvlUsd = poolWithAddress.tvl;

    return { data: tvlUsd, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBolideTVL;
