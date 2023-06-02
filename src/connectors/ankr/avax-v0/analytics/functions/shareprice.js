/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { ANKRABI} = require('../../abi/ERC20ANKR');

async function checkAnkrSharePrice(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const ANKR = new ethers.Contract(poolAddress, ANKRABI, provider);
    const exchangeRateBN = await ANKR.ratio();
    const sharePrice = exchangeRateBN.toString() / 10 ** 18;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAnkrSharePrice;
