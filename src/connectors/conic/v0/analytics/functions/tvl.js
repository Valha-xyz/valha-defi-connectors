/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { InvestABI } = require('../../abi/Invest');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

async function checkConicV0TVL(chain, investAddress, underlying) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(investAddress, InvestABI, provider);
    const TvlBN = await POOL.totalUnderlying();
    const decimals = await erc20Decimals(provider, underlying);
    const TVL = TvlBN / 10 ** decimals;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkConicV0TVL;
