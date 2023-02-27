/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { ManagerABI } = require('../../abi/Manager');

async function checkGMXV0Share(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, ManagerABI, provider);
    const SUPPLY = '';
    const TVLBN = await POOL.getAumInUsdg(false);
    const SupplyBN = await SUPPLY.totalSupply();
    const sharePrice =
      TVLBN.toString() / 10 ** 18 / (SupplyBN.toString() / 10 ** 18);
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkGMXV0Share;
