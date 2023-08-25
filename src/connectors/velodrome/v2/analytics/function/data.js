/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const  POOLABI = require('../../abi/POOL');
const GAUGEABI = require('../../abi/GAUGE');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'
const pools = require('../../pools/pools');


async function checkVelodromeV2Data(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });
    
    const tokenAddress0 = poolInfo.underlying_tokens[0];
    const tokenAddress1 = poolInfo.underlying_tokens[1];
    const gaugeAddress = poolInfo.staking_address;
    const rewardAddress = poolInfo.rewards_tokens[0];

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');


    // TVL COMPUTATION 
    const poolContract = new ethers.Contract(poolAddress, POOLABI, provider);

    const metadata = await poolContract.metadata();
    const r0 = metadata.r0 / metadata.dec0;
    const r1 = metadata.r1 / metadata.dec1;

    const info = await getGeckoTokenPrice(chain,tokenAddress0);
    if (info.err) throw new Error(info.err.message);
    const price0 = info.data;

    const info1 = await getGeckoTokenPrice(chain,tokenAddress1);
    if (info1.err) throw new Error(info1.err.message);
    const price1 = info1.data;

    const p0 = price0 || 0;
    const p1 = price1 || 0;

    const tvlUsd =
      p0 === 0 && p1 === 0 
        ? 0 : p0 === 0
        ? r1 * p1 * 2 : p1 === 0
        ? r0 * p0 * 2 : r0 * p0 + r1 * p1;

    // REWARDS APY COMPUTATION 
    const gaugeContract = new ethers.Contract(gaugeAddress, GAUGEABI, provider);
    const rewardRate = await gaugeContract.rewardRate();

  
    const info2 = await getGeckoTokenPrice(chain,rewardAddress);
    if (info2.err) throw new Error(info2.err.message);
    const velo_price = info2.data;

   
    const apy =
      (((rewardRate / 1e18) *
        86400 * 365 * velo_price / tvlUsd) * 100);

    return {
      data: {
        tvl: tvlUsd || 0,
        rewards_apy: apy || 0,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkVelodromeV2Data;
