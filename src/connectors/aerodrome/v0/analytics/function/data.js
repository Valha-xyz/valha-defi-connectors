/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const POOLABI = require('../../abi/POOL');
const ROUTERABI = require('../../abi/ROUTER');
const GAUGEABI = require('../../abi/GAUGE');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'
const pools = require('../../pools/pools');
const axios = require('axios');
const { queryGraphData, histo, getBlocksByTime} = require ('./external/graphQuery');


export const SUBGRAPH_URLS = {
  optimism: "https://api.thegraph.com/subgraphs/name/messari/velodrome-v2-optimism",
}

const BASE_URL = "https://coins.llama.fi/prices/current/" 
const FACTORY = "0x420DD381b31aEf6683db6B902084cB0FFECe40Da"
const USDCbC = "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca"


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
    const routerAddress = poolInfo.investing_address;
    const rewardAddress = poolInfo.rewards_tokens[0];

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');


    // TVL COMPUTATION 
    const poolContract = new ethers.Contract(poolAddress, POOLABI, provider);

    const metadata = await poolContract.metadata();
    const r0 = metadata.r0 / metadata.dec0;
    const r1 = metadata.r1 / metadata.dec1;

    // const info = await getGeckoTokenPrice(chain,tokenAddress0);
    // if (info.err) throw new Error(info.err.message);
    // const price0 = info.data;

    // const info1 = await getGeckoTokenPrice(chain,tokenAddress1);
    // if (info1.err) throw new Error(info1.err.message);
    // const price1 = info1.data;

    
    const info = await axios.get(BASE_URL + chain + ':' + tokenAddress0);
    if (info.err) throw new Error(info.err.message);
    const price0 = info.data;

    const info1 = await axios.get(BASE_URL + chain + ':' + tokenAddress1);
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

  
    // const info2 = await getGeckoTokenPrice(chain,rewardAddress);
    // if (info2.err) throw new Error(info2.err.message);
    // const velo_price = info2.data;

    // Solution directly onchain that doesnot require an offchain API.

    const info2 = await axios.get(BASE_URL + chain + ':' + USDCbC);
    if (info2.err) throw new Error(info2.err.message);
    const USDCbC_price = info2.data;

    const routerContract = new ethers.Contract(routerAddress, ROUTERABI, provider);
    const reserves = await routerContract.getReserves(rewardAddress, USDCbC, false, FACTORY);
    const aero_price = USDCbC_price*(reserves.reserveB/10**6)/(reserves.reserveA/10**18)

   
    const apy =
      (((rewardRate / 1e18) *
        86400 * 365 * aero_price / tvlUsd) * 100);


    // volume & fees

    const currentTimestamp = Math.floor(Date.now() / 1000)- 100;
    const timestamp7d = currentTimestamp - (7 * 24 * 60 * 60);

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const block7d =  await getBlocksByTime(timestamp7d,chain);

    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    const query7d = await queryGraphData(SUBGRAPH_URL,poolAddress,block7d);
    const pool = await histo(query, query7d);

    return {
      data: {
        tvl: tvlUsd || 0,
        rewards_apy: apy || 0,
        volume: pool.volumeUSDyear7d || 0, 
        fee: pool.feeUSDyear7d || 0

      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkVelodromeV2Data;
