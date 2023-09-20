/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { PoolABI } = require('../../abi/Pool');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

async function checkPoolSupply(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const SupplyBN = await POOL.totalSupply();
    const decimals = await erc20Decimals(provider, poolAddress);
    const Supply = SupplyBN / 10 ** decimals;
    return { data: Supply, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkPoolSupply;
