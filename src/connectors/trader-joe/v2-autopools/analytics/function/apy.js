/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
const pools = require('../../pools/pools');
const axios = require('axios');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
const GAUGEABI = require('../../abi/GAUGE');
const PID = require('../../interactions/STAKINGPID');


async function checkTraderJoeApy(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });
    const stakingAddress = poolInfo.staking_address;

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    


    // ACTIVITY APY COMPUTATION 


    // REWARDS APY COMPUTATION 

    const pid = await PID(chain, stakingAddress,poolAddress);
    if (pid.err) throw new Error(pid.err);
    const poolId = Number(pid.data);

    const Gauge = new ethers.Contract(stakingAddress, GAUGEABI, provider);
    const Farm = await Gauge.farmInfo(poolId);
    const joePerSec = Number(Farm.joePerSec);


    const rewardPerSecond = joePerSec / 1e18 
    ;
    const rewardPerDay = rewardPerSecond * 86400;

    const info = await getGeckoTokenPrice(chain,poolInfo.rewards_tokens[0]);
    if (info.err) throw new Error(info.err.message);
    const joeUsd= info.data;

    const rewards_apy = (rewardPerDay * 365 * joeUsd);


    return {
      data: {
        activity_apy: 0,
        rewards_apy: rewards_apy,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkTraderJoeApy;
