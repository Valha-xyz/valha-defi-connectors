/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LPSTAKING } = require('../../abi/LPStaking');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const {getGeckoTokenPrice} = require('../../../../../utils/prices/getGeckoTokenPrice');
const axios = require ('axios');
const _ = require('lodash');
const pools = require('../../pools/pools');

const SECONDS_PER_YEAR = 3600 * 24 * 365.25
const BASE_URL = 'https://across.to/api/pools?token=<IDHOLDER>'



async function checkAcrossV0APY(chain,poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });


    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');

    //Reward and underlying price

    const info = await getGeckoTokenPrice(chain,poolInfo.rewards_tokens[0]);
    if (info.err) throw new Error(info.err.message);
    const rewardTokenPrice = info.data;
    const info2 = await getGeckoTokenPrice(chain,poolInfo.underlying_tokens[0]);
    if (info2.err) throw new Error(info2.err.message);
    const underlyingTokenPrice = info2.data;

    //Reward and underlying decimals

    const rewardTokenDecimals = await erc20Decimals(provider, poolInfo.rewards_tokens[0]);
    const underlyingTokenDecimals = await erc20Decimals(provider, poolInfo.underlying_tokens[0]);
    const poolTokenDecimals  = await erc20Decimals(provider, poolAddress);

    // Exchange Rate
    
    const URL = BASE_URL.replace('<IDHOLDER>',poolInfo.underlying_tokens[0])
    const result = await axios.get(URL);
    const exchangeRateCurrent = Number(result.data.exchangeRateCurrent)/(10 ** poolTokenDecimals);
    

    // Activity APY

    const estimatedApy = Number(result.data.estimatedApy);

    // Rewards APY

    const stakingPool = new ethers.Contract(poolInfo.staking_address,LPSTAKING,provider);
    const overallStaking = await stakingPool.stakingTokens(poolAddress);
   
    const cumulativeStakedUsd = (overallStaking.cumulativeStaked * underlyingTokenPrice * exchangeRateCurrent)/ (10 ** underlyingTokenDecimals )
    const rewardsPerYearUsd = (overallStaking.baseEmissionRate * rewardTokenPrice * SECONDS_PER_YEAR) / (10 ** rewardTokenDecimals );
    const rewardApy = rewardsPerYearUsd / cumulativeStakedUsd;

    return { data: {activityApy: estimatedApy, rewardApy: rewardApy}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAcrossV0APY;
