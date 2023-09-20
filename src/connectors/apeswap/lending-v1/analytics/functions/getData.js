/* eslint-disable @typescript-eslint/no-var-requires */
import { PoolABI } from '../../abi/Pool';
import { RewardABI } from '../../abi/Rewards';
import { ethers } from 'ethers';
import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');



async function checkApeswapData(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const apyBase = await POOL.supplyRatePerBlock()/1e18;

    return { data: { apyBase }, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}


module.exports = checkApeswapData;
