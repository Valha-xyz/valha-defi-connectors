
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { SETHABI } = require('../../abi/SETH');
const { getUSDETH } = require('../../../../../utils/prices/getUSDETH');

async function checkStakewiseTVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const SETH2 = new ethers.Contract(poolAddress, SETHABI, provider);
    const TVLBN = await SETH2.totalDeposits() / 10 ** 18;

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

module.exports = checkStakewiseTVL;
