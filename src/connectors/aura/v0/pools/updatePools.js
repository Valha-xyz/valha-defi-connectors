const path = require('path');
import fs from 'fs';
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const ethers = require('ethers');
import { BoosterABI } from '../abi/Booster';
import { PoolABI } from '../abi/Pool';
import { ExtraABI } from '../abi/Extra';

export const BoosterAddress = {
  ethereum: '0xa57b8d98dae62b26ec3bcc4a365338157060b234',
  optimism: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
  arbitrum: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
  polygon: '0x98Ef32edd24e2c92525E59afc4475C1242a30184',
};

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Router = {
  ethereum: '0xb188b1cb84fb0ba13cb9ee1292769f903a9fec59',
  arbitrum: '0x6b02fefd2f2e06f51e17b7d5b8b20d75fd6916be',
  polygon: '0xce66e8300dc1d1f5b0e46e9145fdf680a7e41146',
  optimism: '0x51b6e0ac6d6435650748513c71db453f96749fe1',
};

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Aura = {
  ethereum: '0xc0c293ce456ff0ed870add98a0828dd4d2903dbf',
  arbitrum: '0x1509706a6c66CA549ff0cB464de88231DDBe213B',
  polygon: '0x1509706a6c66ca549ff0cb464de88231ddbe213b',
  optimism: '0x1509706a6c66ca549ff0cb464de88231ddbe213b',
};

async function getPools(chain, x) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    console.log(chain);
    const ORIGIN = new ethers.Contract(
      BoosterAddress[chain],
      BoosterABI,
      provider,
    );

    const poolAddressInfo = await ORIGIN.poolInfo(x);
    const poolAddress = poolAddressInfo.crvRewards;
    console.log(poolAddress);
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);

    // extra reward tokens
    let tableToken = [];
    const balToken = await POOL.rewardToken();
    tableToken.push(balToken.toLowerCase()); // Bal token address
    tableToken.push(Aura[chain].toLowerCase());

    try {
      const extraRewardLengths = await POOL.extraRewardsLength();

      for (let i = 0; i < extraRewardLengths; i++) {
        const extraRewardAddress = await POOL.extraRewards(x);
        const extraContract = new ethers.Contract(
          extraRewardAddress,
          ExtraABI,
          provider,
        );
        const extraTokenAddress = await extraContract.rewardToken();
        tableToken.push(extraTokenAddress);
      }
    } catch (err) {
      console.log('No extra rewards.');
    }

    const tokensInfo = await ORIGIN.poolInfo(x);
    const lpToken = tokensInfo.lptoken;

    // We create the pools object
    const formattedPools = {
      name: await POOL.name(),
      chain: chain,
      underlying_tokens: [lpToken.toLowerCase()],
      pool_address: poolAddress.toLowerCase(),
      investing_address: Router[chain].toLowerCase(),
      staking_address: null,
      boosting_address: null,
      distributor_address: null,
      rewards_tokens: tableToken,
      metadata: {},
    };
    return formattedPools;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function generatePools() {
  let result = [];
  const CHAINS = ['arbitrum', 'ethereum', 'optimism', 'polygon'];

  for (const chain of CHAINS) {
    let result_chain = [];
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const ORIGIN = new ethers.Contract(
      BoosterAddress[chain],
      BoosterABI,
      provider,
    );
    const poolLength = await ORIGIN.poolLength();

    for (let x = 0; x < poolLength; x++) {
      const poolsChain = await getPools(chain, x);
      console.log(poolsChain);
      result_chain = [...result_chain, poolsChain];
    }

    result = [...result, ...result_chain];
  }
  return result;
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, '/generatedPools.json');
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
