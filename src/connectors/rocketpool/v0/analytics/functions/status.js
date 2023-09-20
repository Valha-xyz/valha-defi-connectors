/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { SETTINGABI } = require('../../abi/DepositSettings');

async function checkRocketV0Status(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const SETTINGS = new ethers.Contract(poolAddress, SETTINGABI, provider);
    const status = await SETTINGS.getDepositEnabled();
    return { data: status, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkRocketV0Status;
