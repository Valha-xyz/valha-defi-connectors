/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const POOLABI = require('../../abi/POOL');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
const pools = require('../../pools/pools');


async function checkTraderJoeTvl(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });
    
    const tokenAddress0 = poolInfo.underlying_tokens[0];
    const tokenAddress1 = poolInfo.underlying_tokens[1];

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');


    // TVL COMPUTATION 
    const poolContract = new ethers.Contract(poolAddress, POOLABI, provider);

    const metadata = await poolContract.getBalances();

    const token0 = new ethers.Contract(tokenAddress0, ERC20ABI, provider);
    const token1 = new ethers.Contract(tokenAddress1, ERC20ABI, provider);

    const decimals0 = await token0.decimals();
    const decimals1 = await token1.decimals();

    const r0 = Number(metadata.amountX) / (10**decimals0);
    const r1 = Number(metadata.amountY) / (10**decimals1);


    const info = await getGeckoTokenPrice(chain,tokenAddress0);
    if (info.err) throw new Error(info.err.message);
    const price0 = info.data;

    const info1 = await getGeckoTokenPrice(chain,tokenAddress1);
    if (info1.err) throw new Error(info1.err.message);
    const price1 = info1.data;

    const p0 = price0 || 0;
    const p1 = price1 || 0;

    const tvlUsd =
      p0 === 0 && p1 === 0 
      ? 0 : p0 === 0
      ? r1 * p1 * 2 : p1 === 0
      ? r0 * p0 * 2 : r0 * p0 + r1 * p1;

    
    return {
      data: {
        tvl: tvlUsd || 0,
        price0: p0,
        price1: p1,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkTraderJoeTvl;
