/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { ManagerABI } = require('../../abi/Manager');

//RESULT IN USD
async function checkGMXV0TVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, ManagerABI, provider);
    const TVLBN = await POOL.getAumInUsdg(false);
    const TVL = TVLBN.toString() / 10 ** 18;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkGMXV0TVL;
