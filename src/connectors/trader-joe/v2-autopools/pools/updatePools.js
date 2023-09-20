/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const POOLABI = require('../abi/POOL');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { ethers } = require('ethers');



async function getDataChain (chain) {


  let result = []

  for (const address in data) {

      const poolAddress = address;
      const provider = getNodeProvider(chain);
      if (!provider) throw new Error('No provider was found.');
      const poolContract = new ethers.Contract(poolAddress, POOLABI, provider);

      const name = poolContract.name(); // the name might need to be changed
      const underlyingTokens = [poolContract.getTokenX, poolContract.getTokenY];

      const stakingContract = new ethers.Contract(stakingAddress, GAUGEABI, provider);
      const rewards_tokens = stakingContract.joe();

      const info = {
        name: name,
        chain,
        underlying_tokens: underlyingTokens,
        pool_address: poolAddress,
        investing_address: poolAddress,
        staking_address: stakingContract,
        boosting_address: null,
        distributor_address: stakingContract,
        rewards_tokens: [rewards_tokens],
        metadata:{}
      } ;


      result = [...result, info];
 }
  return result

}

async function generatePools () {
  let result = []
  const CHAINS = ['avalanche','ethereum','arbitrum','bsc'];
  const EXCHANGES = [];
  for (const chain of CHAINS) {
    const pools = await getDataChain(chain)
    result = [...result, ...pools]
  }
  return result
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools, null, 4)
  const relativePath = path.join(__dirname, '/generatedPools.json')
  fs.writeFileSync(relativePath, strPools)
}

updatePools()
