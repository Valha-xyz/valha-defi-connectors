/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LPSTAKINGOP } = require('../../abi/LPStakingOP');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const STAKING_PID = require('../../interactions/STAKINGPID');
const {
  getGeckoTokenPrice,
} = require('../../../../../utils/prices/getGeckoTokenPrice');

async function checkStargateV0RewardsAPY(
  chain,
  poolAddress,
  stakingAddress,
  rewardAddress,
  tvl,
) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const StakingPOOL = new ethers.Contract(
      stakingAddress,
      LPSTAKINGOP,
      provider,
    );
    const PID = STAKING_PID[chain][poolAddress.toLowerCase()];
    const poolInfo = await StakingPOOL.poolInfo(PID);
    const allocPointBN = poolInfo.allocPoint;
    const eTokenPerblock = await StakingPOOL.eTokenPerSecond();
    const totalAllocPoint = await StakingPOOL.totalAllocPoint();
    const priceInfo = await getGeckoTokenPrice(chain, rewardAddress);
    if (priceInfo.err) throw new Error(priceInfo.err);
    const rewardPrice = priceInfo.data;
    const BLOCK_TIME = 1;
    const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
    const BLOCKS_PER_YEAR = SECONDS_PER_YEAR / BLOCK_TIME;
    const weight = allocPointBN / totalAllocPoint;
    const rewardPerBlock = eTokenPerblock * weight;
    const rewardPerYear = (rewardPerBlock / 1e18) * BLOCKS_PER_YEAR;
    const rewardUSD = rewardPerYear * rewardPrice;
    const apr = (rewardUSD / tvl) * 100;
    return { data: apr, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStargateV0RewardsAPY;
