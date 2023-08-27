/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LPSTAKING } = require('../../abi/LPStaking');
const STAKING_PID = require('../../interactions/STAKINGPID');
const pools = require('../../pools/pools');
const {getGeckoTokenPrice} = require('../../../../../utils/prices/getGeckoTokenPrice');
const _ = require('lodash');




const calcApy = (priceOfSyn, tvl, synapsePerSecond, totalAllocPoint, poolAllocPoint) => {
  // # Calculate the annualized rewards for this pool
  pool_rewards = (synapsePerSecond * (poolAllocPoint / totalAllocPoint)) * 60 * 60 * 24 * 365
  // # Calculate the APY
  apy = (pool_rewards * priceOfSyn) / tvl
  return apy * 100
}

async function checkSynapseV0RewardsAPY(chain,poolAddress,tvlUsd) {
  try {

    
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    let apy = 0;

    if (poolInfo.staking_address == null){
      apy = 0;
    } else {

      const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const stakingPool = new ethers.Contract(poolInfo.staking_address,LPSTAKING,provider);


    const PID = STAKING_PID[chain][poolAddress];

    const synapsePerSecond = await stakingPool.synapsePerSecond();
    const totalAllocPoint = await stakingPool.totalAllocPoint();
    const pInfo = await stakingPool.poolInfo(PID);
    const allocPoint = pInfo.allocPoint;
    

    const info = await getGeckoTokenPrice(chain,poolInfo.rewards_tokens[0]);
    if (info.err) throw new Error(info.err.message);
    const synPrice = info.data;

    apy = calcApy(synPrice, tvlUsd, Number(synapsePerSecond) / (10 ** 18), Number(totalAllocPoint), Number(allocPoint))

    }


    
    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkSynapseV0RewardsAPY;
