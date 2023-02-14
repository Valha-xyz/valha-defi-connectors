/* eslint-disable @typescript-eslint/no-var-requires */
import { PoolABI } from '../../abi/Pool';
import { ethers } from 'ethers';
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkCompoundV2Outloans(chain, poolAddress, underlyingDecimals) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const TvlBN = await POOL.totalBorrows();
    const TVL = TvlBN / 10 ** underlyingDecimals;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCompoundV2Outloans;
