/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { InvestABI } = require('../../abi/Invest');

async function checkConicV0SharePrice(chain, investAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(investAddress, InvestABI, provider);
    const exchangePriceBN = await POOL.exchangeRate();
    const sharePrice = exchangePriceBN.toString() / 10 ** 18;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkConicV0SharePrice;
