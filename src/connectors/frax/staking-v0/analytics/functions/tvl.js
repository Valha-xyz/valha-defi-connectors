
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { FRXETHABI } = require('../../abi/FRXETH');
const { getUSDETH } = require('../../../../../utils/prices/getUSDETH');

async function checkFraxTVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const FRXETH = new ethers.Contract(poolAddress, FRXETHABI, provider);
    const TVLBN = await FRXETH.totalSupply() / 10 ** 18;

    const { data, err } = await getUSDETH();
    if (err) throw new Error(err.message);
    const exchangePrice = data;
    
    const TVL = exchangePrice * TVLBN

    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkFraxTVL;
