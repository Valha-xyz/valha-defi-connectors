/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const ethers = require('ethers');
const { PoolTokenABI } = require('../../abi/SanToken');
const { LpABI } = require('../../abi/LP');
const { getGeckoTokenPrice } = require('src/utils/prices/getGeckoTokenPrice');

async function getPancakeShareprice(chain, pool_address, TVL) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    // Get Total Supply
    const LP = new ethers.Contract(pool_address, LpABI, provider);
    const totalSupplyBN = await LP.totalSupply();
    const decimals = await LP.decimals();
    const totalSupply = totalSupplyBN.toString() / 10 ** decimals;
    // Calculate SharePrice
    const share_price = TVL / totalSupply;
    return { data: share_price, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAngleV1Share;
