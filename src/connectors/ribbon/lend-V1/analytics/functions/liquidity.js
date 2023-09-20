/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const ethers = require('ethers');
const { PoolTokenABI } = require('../../abi/Pool');

async function checkRibbonV1Liquidity(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const liquidityBN = await POOL.availableToWithdraw();
    const decimals = await erc20Decimals(provider, poolAddress);
    const liquidity = liquidityBN / 10 ** decimals;
    return { data: liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkRibbonV1Liquidity;
