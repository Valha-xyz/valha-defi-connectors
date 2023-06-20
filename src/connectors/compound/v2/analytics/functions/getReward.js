/* eslint-disable @typescript-eslint/no-var-requires */

import { RewardsABI } from '../../abi/Rewards';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkCompoundV2Rewards(chain, poolAddress) {
  try {
    const COMPTROLLER_ADDRESS = '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B';

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    /* APY rewards */
    const DISTRIBUTOR = new ethers.Contract(COMPTROLLER_ADDRESS, RewardsABI, provider);
    const apyRewards = await DISTRIBUTOR.compSupplySpeeds(poolAddress)/1e18;

    return { data: { apyRewards }, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCompoundV2Rewards;
