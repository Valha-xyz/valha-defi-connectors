/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { WSTETHABI } = require('../../abi/WSTETH');

async function checkLidoV0SharePrice(poolAddress) {
  try {
    const provider = getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, WSTETHABI, provider);
    const sharePriceBN = await POOL.stEthPerToken();
    const decimals = await POOL.decimals();
    const sharePrice = sharePriceBN / 10 ** decimals;

    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

// checkLidoV0SharePrice('0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0');

module.exports = checkLidoV0SharePrice;
