
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { POOLABI } = require('../../abi/DepositPool');
const { getUSDETH } = require('../../../../../utils/prices/getUSDETH');

async function checkCoinbaseTVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const depositPool = new ethers.Contract(poolAddress, POOLABI, provider);
    const TVLBN = await depositPool.totalSupply() / 10 ** 18;
    const exchangeRate = await depositPool.exchangeRate() / 10 ** 18;

    const { data, err } = await getUSDETH();
    if (err) throw new Error(err.message);
    const price = data;
    
    const TVL = price * TVLBN * exchangeRate;

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCoinbaseTVL;
