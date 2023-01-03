/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const SETTINGABI = require('../../abi/DepositSettings.json');

async function checkRocketV0Minimum(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const SETTINGS = new ethers.Contract(poolAddress, SETTINGABI, provider);
    const minimmumBN = await SETTINGS.getMinimumDeposit();
    const minimum = minimmumBN.toString() / 10 ** 18;
    return { data: minimum, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkRocketV0Minimum;
