
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { POOLABI } = require('../../abi/DepositPool');
const { getUSDETH } = require('../../../../../utils/prices/getUSDETH');

async function checkStaderTVL(chain, poolAddress, investing_address) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const depositPool = new ethers.Contract(investing_address, POOLABI, provider);
    const TVLBN = await depositPool.totalAssets() / 10 ** 18;

    const { data, err } = await getUSDETH();
    if (err) throw new Error(err.message);
    
    const TVL = data * TVLBN;

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStaderTVL;
