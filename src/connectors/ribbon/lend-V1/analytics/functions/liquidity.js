/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('src/utils/getNodeProvider');
const { erc20Decimals } = require('src/utils/ERC20Decimals');
const ethers = require('ethers');
const PoolTokenABI = require('../../abi/Pool.json');

async function checkRibbonV1Liquidity(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const liquidityBN = await POOL.availableToWithdraw();
    const decimals = await erc20Decimals(provider, poolAddress);
    const liquidity = liquidityBN / 10 ** decimals;
    return { data: liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkRibbonV1Liquidity;
