/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { SETHABI } = require('../../abi/SETH');

async function checkStakewiseSharePrice(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const SETH2 = new ethers.Contract(poolAddress, SETHABI, provider);
    const totalAssets = await SETH2.totalDeposits() / 10 ** 18;
    const totalSupply = await SETH2.totalSupply() / 10 ** 18;
    
    const sharePrice = totalAssets/totalSupply;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStakewiseSharePrice;
