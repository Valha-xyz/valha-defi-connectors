/* eslint-disable @typescript-eslint/no-var-requires */
import { PoolABI } from '../../abi/Pool';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkCompoundV2Data(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const apyBase = (await POOL.supplyRatePerBlock()) / 1e18;
    return { data: { apyBase }, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCompoundV2Data;
