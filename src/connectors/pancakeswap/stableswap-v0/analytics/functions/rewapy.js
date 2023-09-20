/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { MasterABI } = require('../../abi/Master');
const {
  getGeckoTokenPrice,
} = require('../../../../../utils/prices/getGeckoTokenPrice');
const { CAKE_PID } = require('../../pools/CAKEPID');

const CAKE = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82';

async function getPancakeRewardAPY(chain, poolAddress, stakingAddress, TVL) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const PID = CAKE_PID[poolAddress.toLowerCase()];
    if (!PID) throw new Error('Pool not found.');
    const MASTER = new ethers.Contract(stakingAddress, MasterABI, provider);
    // Get CakePrice
    const priceInfo = await getGeckoTokenPrice(chain, CAKE);
    if (priceInfo.err) throw new Error(priceInfo.err);
    const cakePrice = priceInfo.data;
    // GET POOL INFO
    const poolInfo = await MASTER.poolInfo(PID);
    // Calculate cakePerYear and poolWeight
    const cakePerBlock = await MASTER.cakePerBlock(poolInfo.isRegular);
    const cakePerYear = (60 / 3) * 60 * 24 * 365 * (cakePerBlock / 10 ** 18);
    let totalAllocPoint = 0;
    if (poolInfo.isRegular) {
      totalAllocPoint = await MASTER.totalRegularAllocPoint();
    } else {
      totalAllocPoint = await MASTER.totalSpecialAllocPoint();
    }
    const poolWeight = poolInfo.allocPoint / totalAllocPoint;
    // Calculate Rewards and return
    const rewardAPY = ((poolWeight * cakePerYear * cakePrice) / TVL) * 100;
    return { data: rewardAPY, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getPancakeRewardAPY;
