
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { BNBXABI } = require('../../abi/BNBX');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'


async function checkStaderTVL(chain, poolAddress) {
  try {


    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const BNBX = new ethers.Contract(poolAddress, BNBXABI, provider);
    const totalSupply = await BNBX.totalSupply();

    const { data, err } = await getGeckoTokenPrice(chain,poolAddress);
    if (err) throw new Error(err.message);

    const TVL = data * totalSupply / 10 ** 18;

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStaderTVL;
