
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { POOLABI } = require('../../abi/DepositPool');
const { DataABI } = require('../../abi/Data');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'


async function checkStaderTVL(chain, investing_address, underlying_address) {
  try {


    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const depositPool = new ethers.Contract(investing_address, POOLABI, provider);
    const dataContract = await depositPool.getContracts();
    const dataPool = new ethers.Contract(dataContract[0], DataABI, provider);

    const getReserves = await dataPool.getReserves();
    const tvlMatic = Number(getReserves[1]/10**18);

    const { data, err } = await getGeckoTokenPrice(chain,underlying_address);
    if (err) throw new Error(err.message);

    const TVL = data * tvlMatic;

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStaderTVL;
