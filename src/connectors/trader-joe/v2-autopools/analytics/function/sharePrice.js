/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const pools = require('../../pools/pools');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
const POOLABI = require ('../../abi/POOL');


async function checkGammaV0SharePrice(chain, poolAddress, tvlUsd, prices) {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');

    const poolToken = new ethers.Contract(poolAddress, ERC20ABI, provider);
    const supplyBN = await poolToken.totalSupply();
    const decimalsBN = await poolToken.decimals();
    const supply = supplyBN / 10 ** decimalsBN;

    const tokenReserves = new ethers.Contract(poolAddress, POOLABI, provider);
    const reserves = await tokenReserves.getBalances();

    const Token0 = new ethers.Contract(poolInfo.underlying_tokens[0], ERC20ABI, provider);
    const Token1 = new ethers.Contract(poolInfo.underlying_tokens[1], ERC20ABI, provider);
    const decimalsToken0 = await Token0.decimals();
    const decimalsToken1 = await Token1.decimals();

    const TVL0 = prices[0] * reserves.amountX / (10 ** decimalsToken0);
    const TVL1 = prices[1] * reserves.amountY / (10 ** decimalsToken1);

    const sharePrice0 = ((TVL0 + TVL1)/TVL0)*(reserves.amountX / (10 ** decimalsToken0));
    const sharePrice1 = ((TVL0 + TVL1)/TVL1)*(reserves.amountY / (10 ** decimalsToken1));


    const share_price = { sharePriceUSD: tvlUsd/supply, sharePriceToken0: sharePrice0/supply, sharePriceToken1 : sharePrice1/supply }
    
    return { data: share_price, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkGammaV0SharePrice;
