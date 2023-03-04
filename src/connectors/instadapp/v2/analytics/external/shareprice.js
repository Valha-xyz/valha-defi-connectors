/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { PoolABI } = require('../../abi/Pool');

async function getInstadappv2SharePrice(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const sharePriceBN = await POOL.exchangePrice();
    const decimals = await POOL.decimals();
    const sharePrice = sharePriceBN / 10 ** decimals;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getInstadappv2SharePrice;
