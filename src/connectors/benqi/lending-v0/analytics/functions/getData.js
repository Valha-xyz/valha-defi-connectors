/* eslint-disable @typescript-eslint/no-var-requires */
import { PoolABI } from '../../abi/Pool';
import { RewardsABI } from '../../abi/Rewards';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

const calculateApy = (ratePerTimestamps) => {
  const secondsPerDay = 86400; // seconds per day
  const daysPerYear = 365;

  return (
    (Math.pow((ratePerTimestamps / 1e18) * secondsPerDay + 1, daysPerYear) -
      1) *
    100
  );
};

const REWARD_TYPES = {
  QI: 0,
  AVAX: 1,
};

async function checkBenqiLendingData(chain, poolAddress) {
  try {
    const COMPTROLLER_ADDRESS = '0x486af39519b4dc9a7fccd318217352830e8ad9b4';

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const apyBaseBN = await POOL.supplyRatePerTimestamp();
    const apyBase = calculateApy(apyBaseBN);

    /* APY rewards */
    const DISTRIBUTOR = new ethers.Contract(
      COMPTROLLER_ADDRESS,
      RewardsABI,
      provider
    );

    const qiRewards = await DISTRIBUTOR.supplyRewardSpeeds(
      REWARD_TYPES.QI,
      poolAddress
    );
    const avaxRewards = await DISTRIBUTOR.supplyRewardSpeeds(
      REWARD_TYPES.AVAX,
      poolAddress
    );

    return { data: { apyBase, qiRewards, avaxRewards }, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBenqiLendingData;
