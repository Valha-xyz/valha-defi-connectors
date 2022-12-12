/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('src/utils/getNodeProvider');
const ethers = require('ethers');
const LPTokenABI = require('../../abi/LP.json');
const { erc20Decimals } = require('src/utils/ERC20Decimals');

async function checkWombatV1Capacity(chain, poolAddress, tokenAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, LPTokenABI, provider);
    const liquidityCap = await POOL.maxSupply();
    const decimals = await erc20Decimals(provider, tokenAddress);
    if (decimals === 0)
      throw new Error(`Error finding decimals for ${tokenAddress}`);
    const capacity = liquidityCap / 10 ** decimals;
    return { data: capacity, err: null };
  } catch (err) {
    console.log(err.message);
    return { data: null, err: err };
  }
}

module.exports = checkWombatV1Capacity;
