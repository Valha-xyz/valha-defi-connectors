/* eslint-disable @typescript-eslint/no-var-requires */

const { queryGraphData, histo, getBlocksByTime} = require ('./external/graphQuery');
import { SUBGRAPH_URLS, GAUGE_URLS} from './external/graphQuery';

const {getGeckoTokenPrice} = require('../../../../../utils/prices/getGeckoTokenPrice');

const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
const _ = require('lodash');
const pools = require('../../pools/pools');

const { GAUGEABI } = require('../../abi/GAUGEABI');
const { OTHERGAUGEABI } = require('../../abi/OTHERGAUGEABI');
const { CONTROLLERABI } = require('../../abi/CONTROLLERABI');
const { FEEABI } = require('../../abi/FEEABI');


const gaugeController = '0xc128468b7ce63ea702c1f104d55a2566b13d3abd';
const BAL = '0xba100000625a3754423978a60c9317c58a424e3d';
const feeCollectorAddress = '0xce88686553686DA562CE7Cea497CE749DA109f9F';




async function checkBalancerV2APY(chain, poolAddress, data) {
  try {

    const provider = getNodeProvider(chain);
    const provider_ethereum = getNodeProvider("ethereum")
    if (!provider) throw new Error('No provider was found.');
    const CONTROLLER = new ethers.Contract(gaugeController, CONTROLLERABI, provider_ethereum);
    

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const stakingAddress = poolInfo.staking_address;
    const currentTimestamp = Math.floor(Date.now() / 1000)- 100;
    const timestamp7d = currentTimestamp - (7 * 24 * 60 * 60);

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const block7d =  await getBlocksByTime(timestamp7d,chain);

    const FEECOLLECTOR  = new ethers.Contract(feeCollectorAddress, FEEABI, provider_ethereum);
    const swapFeePercentage = await FEECOLLECTOR.getSwapFeePercentage()/1e18

    // Activity APY and volume
    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    const query7d = await queryGraphData(SUBGRAPH_URL,poolAddress,block7d);
    const pool = await histo(query, query7d, swapFeePercentage);

    // Rewards APY

    let GAUGE;
    if (chain === 'ethereum') {
    GAUGE = new ethers.Contract(stakingAddress, GAUGEABI, provider);}
    else { GAUGE = new ethers.Contract(stakingAddress, OTHERGAUGEABI, provider)};
    
    let inflationRate;
    let price;
    if (chain === 'ethereum') {
      inflationRate = await GAUGE.inflation_rate() / 1e18; 
      // get BAL price
      const info = await getGeckoTokenPrice("ethereum",BAL);
      if (info.err) throw new Error(info.err.message);
      price = info.data;
    }

    // add LM rewards if available to the specific pool
    const aprLMRewards = [];
    const rewardTokens = [];
    if (chain === 'ethereum') {
      // get relative weight (of base BAL token rewards for a pool)
      const relativeWeight = await CONTROLLER.gauge_relative_weight(stakingAddress) / 1e18;

      // for base BAL rewards
      if (relativeWeight !== 0) {
        const workingSupply = await GAUGE.working_supply()/ 1e18;

        // bpt == balancer pool token
        const bptPrice = data.tvl / data.totalShares;
        const balPayable = inflationRate * 7 * 86400 * relativeWeight;
        const weeklyReward = (0.4 / (workingSupply + 0.4)) * balPayable;
        const yearlyReward = weeklyReward * 52 * price;
        const aprLM = (yearlyReward / bptPrice) * 100;
        aprLMRewards.push(aprLM === Infinity ? 0 : aprLM);
        rewardTokens.push(BAL);
      }
    }
    // first need to find the reward token
    // (balancer UI loops up to 8times, will replicate the same logic)
    const MAX_REWARD_TOKENS = 8;
    for (let i = 0; i < MAX_REWARD_TOKENS; i++) {
      // get token reward address
      const addBig = await GAUGE.reward_tokens(i)
      const add = addBig.toLowerCase();
      if (add === '0x0000000000000000000000000000000000000000') {
        break;
      }
      // get cg price of reward token
      const info = await getGeckoTokenPrice(chain,add);
      if (info.err) throw new Error(info.err.message);
      const price = info.data;

      // call reward data and total supply
      const { rate, period_finish } = await GAUGE.reward_data(add);
      const totalSupply = await GAUGE.totalSupply()/1e18;

      if (period_finish * 1000 < new Date().getTime()) continue;
      const inflationRate = rate / 1e18;
      const tokenPayable = inflationRate * 7 * 86400;
      const weeklyRewards = (1 / (totalSupply + 1)) * tokenPayable;
      const yearlyRewards = weeklyRewards * 52 * price;
      const bptPrice = data.tvl / data.totalShares;
      const aprLM = (yearlyRewards / bptPrice) * 100;

      aprLMRewards.push(aprLM === Infinity ? null : aprLM);
      rewardTokens.push(add);
    }
    // add up individual LM rewards
    data.aprLM = aprLMRewards.filter((i) => isFinite(i)).reduce((a, b) => a + b, 0);

    return { data: {actApy: pool.apy7d, rewApy: data.aprLM, volume: pool.volume7d}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBalancerV2APY;

