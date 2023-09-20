/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { RPLABI } = require('../../abi/ERC20RPL');
const { getUSDETH } = require('../../../../../utils/prices/getUSDETH');

async function checkRocketV0TVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const RPL = new ethers.Contract(poolAddress, RPLABI, provider);
    const exchangeRateBN = await RPL.getExchangeRate();
    const sharePrice = exchangeRateBN.toString() / 10 ** 18;
    const TotalSupplyBN = await RPL.totalSupply();
    const TotalSupply = TotalSupplyBN.toString() / 10 ** 18;
    const { data, err } = await getUSDETH();
    if (err) throw new Error(err.message);
    const exchangePrice = data;
    const TVL = sharePrice * TotalSupply * exchangePrice;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkRocketV0TVL;
