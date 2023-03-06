/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LpABI } = require('../../abi/LP');

async function getPancakeShareprice(chain, poolAddress, TVL) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    // Get Total Supply
    const LP = new ethers.Contract(poolAddress, LpABI, provider);
    const totalSupplyBN = await LP.totalSupply();
    const decimals = await LP.decimals();
    const totalSupply = totalSupplyBN.toString() / 10 ** decimals;
    // Calculate SharePrice
    const sharePrice = TVL / totalSupply;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getPancakeShareprice;
