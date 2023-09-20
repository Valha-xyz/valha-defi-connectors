/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { ManagerABI } = require('../../abi/Manager');

//RESULT IN USD
async function checkGMXV0TVL(chain, poolAddress) {
  try {
    const VAULT_MANAGERS = {
      arbitrum: '0x321F653eED006AD1C29D174e17d96351BDe22649',
      avalanche: '0xD152c7F25db7F4B95b7658323c5F33d176818EE4'
    }

    
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const MANAGER = new ethers.Contract(VAULT_MANAGERS[chain], ManagerABI, provider);
    const TVLBN = await MANAGER.getAumInUsdg(false);
    const TVL = TVLBN.toString() / 10 ** 18;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkGMXV0TVL;
