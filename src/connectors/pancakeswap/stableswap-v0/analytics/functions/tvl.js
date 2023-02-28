/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const ethers = require('ethers');
const { PoolTokenABI } = require('../../abi/SanToken');
const { SwapABI } = require('../../abi/Swap');
const { getGeckoTokenPrice } = require('src/utils/prices/getGeckoTokenPrice');

async function getPancakeTVL(
  chain,
  investingAddress,
  tokenAAddress,
  tokenBAddress
) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(investingAddress, SwapABI, provider);
    // Get Reserve in Token A and B with the right number of decimals
    const reserveABN = await POOL.balances(0);
    const reserveBBN = await POOL.balances(1);
    const TOKENA = new ethers.Contract(tokenAAddress, ERC20ABI, provider);
    const TOKENB = new ethers.Contract(tokenBAddress, ERC20ABI, provider);
    const decimalsA = await TOKENA.decimals();
    const decimalsB = await TOKENB.decimals();
    const reserveA = reserveABN.toString() / 10 ** decimalsA;
    const reserveB = reserveBBN.toString() / 10 ** decimalsB;
    // Transform Reserves in USD
    const priceAInfo = await getGeckoTokenPrice('bsc', tokenAAddress);
    if (priceAInfo.err) throw new Error(priceAInfo.err);
    const priceBInfo = await getGeckoTokenPrice('bsc', tokenBAddress);
    if (priceBInfo.err) throw new Error(priceBInfo.err);
    const balanceA = reserveA * priceAInfo;
    const balanceB = reserveB * priceBInfo;
    // Sum and return USD
    const TVL = balanceA + balanceB;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAngleV1Share;
