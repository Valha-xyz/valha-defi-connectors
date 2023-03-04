/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LP } = require('../../abi/LP');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

async function checkStargateV0TVL(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, LP, provider);
    const TvlBN = await POOL.totalLiquidity();
    const decimals = await erc20Decimals(provider, poolAddress);
    const TVL = TvlBN / 10 ** decimals;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStargateV0TVL;
