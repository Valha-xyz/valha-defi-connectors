/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { ManagerABI } = require('../../abi/Manager');

//RESULT IN USD
async function checkGMXV0TVL(chain, poolAddress) {
  try {
    const VAULT_MANAGER = '0x321F653eED006AD1C29D174e17d96351BDe22649';
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const MANAGER = new ethers.Contract(VAULT_MANAGER, ManagerABI, provider);
    const TVLBN = await MANAGER.getAumInUsdg(false);
    const TVL = TVLBN.toString() / 10 ** 18;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkGMXV0TVL;
