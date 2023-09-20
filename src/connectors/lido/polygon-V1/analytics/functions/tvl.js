/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { STABI } = require('../../abi/STMATIC');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const { getUSDToken } = require('../../../../../utils/prices/getGeckoUSDToken');

async function checkLidoPolygonV1TVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, STABI, provider);
    const TotalMaticBN = await POOL.getTotalPooledMatic();
    const decimals = await erc20Decimals(provider, poolAddress);
    const TotalMatic = TotalMaticBN / 10 ** decimals;
    const { data, err } = await getUSDToken('matic-network');
    if (err) throw new Error(err.message);
    const exchangePrice = data;
    const TVLUSD = TotalMatic * exchangePrice;
    return { data: TVLUSD, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkLidoPolygonV1TVL;
