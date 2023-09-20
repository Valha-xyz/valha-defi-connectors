/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { POOLABI } = require('../../abi/DepositPool');

async function checkStadermaximum(chain, investingAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const SETTINGS = new ethers.Contract(investingAddress, POOLABI, provider);
    const maximumBN = await SETTINGS.maxDeposit();
    const maximum = maximumBN.toString() / 10 ** 18;
    return { data: maximum, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStadermaximum;
