/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const pools = require('../../pools/pools');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
const {POOLABI} = require('../../abi/POOLABI');


async function checkArrakisV1TVL(chain, poolAddress) {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');

    // token price

    const info = await getGeckoTokenPrice(chain,poolInfo.underlying_tokens[0]);
    if (info.err) throw new Error(info.err.message);
    const price0 = info.data;
    const info1 = await getGeckoTokenPrice(chain,poolInfo.underlying_tokens[1]);
    if (info1.err) throw new Error(info1.err.message);
    const price1 = info1.data;

    const poolToken = new ethers.Contract(poolAddress, POOLABI, provider);
    const balances = await poolToken.getUnderlyingBalances();

    const Token0 = new ethers.Contract(poolInfo.underlying_tokens[0], ERC20ABI, provider);
    const Token1 = new ethers.Contract(poolInfo.underlying_tokens[1], ERC20ABI, provider);
    const decimalsToken0 = await Token0.decimals();
    const decimalsToken1 = await Token1.decimals();

    const TVL = (price0 * balances.amount0Current)/(10 ** decimalsToken0) + 
    (price1 * balances.amount1Current)/(10 ** decimalsToken1);

    return { data: {TVL: TVL, price0: price0, price1: price1}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkArrakisV1TVL;
