/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const ATokenABI = require('../../abi/AToken.json');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const { getGeckoTokenPrice } = require('src/utils/prices/getGeckoTokenPrice');

async function checkAaveV3Liquidity(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const AToken = new ethers.Contract(poolAddress, ATokenABI, provider);
    const underlyingTokenAddress = await AToken.underlyingAssetAddress();
    const { data, err } = await getGeckoTokenPrice(
      chain,
      underlyingTokenAddress
    );
    if (err) throw new Error(err.message);
    const tokenPrice = data;
    const Token = new ethers.Contract(
      underlyingTokenAddress,
      ERC20ABI,
      provider
    );
    const decimals = await Token.decimals();
    const totalBalanceBN = await Token.balanceOf(poolAddress);
    const totalBalance = totalBalanceBN / 10 ** decimals;
    const liquidityUSD = totalBalance * tokenPrice;
    return { data: liquidityUSD, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkAaveV3Liquidity;
