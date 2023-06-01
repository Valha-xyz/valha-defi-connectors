/* eslint-disable @typescript-eslint/no-var-requires */
// import { RewardABI } from '../../abi/Rewards';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');



async function checkFluxRewardsData(chain, poolAddress) {
  try {
    // const COMPTROLLER_ADDRESS = "0xfD36E2c2a6789Db23113685031d7F16329158384";

    // const provider = getNodeProvider(chain);
    // if (!provider) throw new Error('No provider was found.');
    // /* APY rewards */
    // const DISTRIBUTOR = new ethers.Contract(COMPTROLLER_ADDRESS, RewardABI, provider);
    const apyRewards = 0;

    return { data: { apyRewards }, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkFluxRewardsData;
