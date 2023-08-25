/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const POOLABI = require('../abi/POOL');
const VOTERABI = require('../abi/VOTER');
const FACTORYABI = require('../abi/FACTORY');
const ethers = require('ethers');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const PoolFactory = '0xf1046053aa5682b4f9a81b5481394da16be5ff5a';
const VELO_TOKEN = '0x9560e827af36c94d2ac33a39bce1fe78631088db';
const Router = '0xa062ae8a9c5e11aaa026fc2670b0d65ccc8b2858';
const Voter = '0x41c914ee0c7e1a5edcd0295623e6dc557b5abf3c';

async function getDataChain(chain) {
  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const factoryPool = new ethers.Contract(PoolFactory, FACTORYABI, provider);
  const poolsLength = await factoryPool.allPoolsLength();

  const voterContract = new ethers.Contract(Voter, VOTERABI, provider);

  let result = [];
  for (let i = 0; i <= poolsLength - 1; i++) {
    const poolAddress = await factoryPool.allPools(i);

    const poolContract = new ethers.Contract(poolAddress, POOLABI, provider);
    const token0 = await poolContract.token0();
    const token1 = await poolContract.token1();
    const stableValue = await poolContract.stable();
    const underlyingTokens = [token0, token1];

    const name = await poolContract.name();

    const stakingAddress = await voterContract.gauges(poolAddress);

    const info = {
      name,
      chain,
      underlying_tokens: underlyingTokens,
      pool_address: poolAddress,
      investing_address: Router,
      staking_address: stakingAddress,
      boosting_address: null,
      distributor_address: stakingAddress,
      rewards_tokens: [VELO_TOKEN],
      metadata: { stable: stableValue },
    };

    result = [...result, info];
  }
  return result;
}

async function generatePools() {
  let result = [];
  const CHAINS = ['optimism'];
  for (const chain of CHAINS) {
    const pools = await getDataChain(chain);
    result = [...result, ...pools];
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
