/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('src/utils/getNodeProvider');
const { erc20Decimals } = require('src/utils/ERC20Decimals');
const ethers = require('ethers');
const PoolTokenABI = require('../../abi/PoolToken.json');

async function checkClearpoolV1Outloans(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const OutloansBN = await POOL.borrows();
    const decimals = await erc20Decimals(provider, poolAddress);
    const outloans = OutloansBN / 10 ** decimals;
    return { data: outloans, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkClearpoolV1Outloans;
