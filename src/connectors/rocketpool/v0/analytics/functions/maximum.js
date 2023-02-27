/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { SETTINGABI } = require('../../abi/DepositSettings');

async function checkRocketV0Maximum(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const SETTINGS = new ethers.Contract(poolAddress, SETTINGABI, provider);
    const capacityBN = await SETTINGS.getMaximumDepositPoolSize();
    const capacity = capacityBN.toString() / 10 ** 18;
    return { data: capacity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkRocketV0Maximum;
