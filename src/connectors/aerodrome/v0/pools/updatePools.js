/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const POOLABI = require('../abi/POOL');
const VOTERABI = require('../abi/VOTER');
const FACTORYABI = require('../abi/FACTORY');
const ethers = require('ethers');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const PoolFactory = '0x420DD381b31aEf6683db6B902084cB0FFECe40Da';
const AERO_TOKEN = '0x940181a94A35A4569E4529A3CDfB74e38FD98631';
const Router = '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43';
const Voter = '0x16613524e02ad97eDfeF371bC883F2F5d6C480A5';

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
      rewards_tokens: [AERO_TOKEN],
      metadata: { stable: stableValue },
    };

    console.log(i);
    console.log(info);

    result = [...result, info];
  }
  return result;
}

async function generatePools() {
  let result = [];
  const CHAINS = ['base'];
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
