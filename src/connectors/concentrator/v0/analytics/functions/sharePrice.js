/* eslint-disable @typescript-eslint/no-var-requires */
const ethers = require('ethers');
const { POOLABI } = require('../../abi/pool');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkConcentatorShare(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, POOLABI, provider);
    const TotalAssetsBN = await POOL.totalAssets();
    const TotalSupplyBN = await POOL.totalSupply();
    const sharePrice = TotalAssetsBN / TotalSupplyBN;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkConcentatorShare;
