/* eslint-disable @typescript-eslint/no-var-requires */
import { RewardsABI } from '../../abi/Rewards';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');



async function checkApeswapRewardsData(chain, poolAddress) {
  try {
    const DISTRIBUTOR_ADDRESS = "0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa";

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    /* APY rewards */
    const DISTRIBUTOR = new ethers.Contract(DISTRIBUTOR_ADDRESS, RewardsABI, provider);
    const apyRewards = await DISTRIBUTOR.compSupplySpeeds(poolAddress); // BANANA DECIMALS

    return { data: { apyRewards }, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkApeswapRewardsData;