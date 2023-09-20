/* eslint-disable @typescript-eslint/no-var-requires */
const ethers = require('ethers');
const { POOLABI } = require('../../abi/pool');
const {
  getGeckoTokenPrice,
} = require('../../../../../utils/prices/getGeckoTokenPrice');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkConcentatorTVL(
  chain,
  poolAddress,
  sharePrice,
  underlyingTokenAddress
) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const { data, err } = await getGeckoTokenPrice(
      chain,
      underlyingTokenAddress
    );
    if (err) throw new Error(err.message);
    const tokenPrice = data;
    const POOL = new ethers.Contract(poolAddress, POOLABI, provider);
    const totalAssetsBN = await POOL.totalAssets();
    const totalAssets = totalAssetsBN / 10 ** 18;
    const totalAssetsInCRV = parseFloat(totalAssets) * parseFloat(sharePrice);
    const totalAssetsUSD = totalAssetsInCRV * tokenPrice;
    return { data: totalAssetsUSD, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkConcentatorTVL;
