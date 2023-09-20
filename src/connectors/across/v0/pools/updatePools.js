/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { ROUTERABI } = require('../abi/Router');
const { LP } = require('../abi/LP');
const ethers = require('ethers');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');

const infoToken = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  '0x6b175474e89094c44da98b954eedeac495271d0f',
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  '0xba100000625a3754423978a60c9317c58a424e3d',
  '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
  '0x44108f0223A3C3028F5Fe7AEC7f9bb2E66beF82F',
  '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
  '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e',
  '0x42bbfa2e77757c645eeaad1655e0911a7553efbc',
];

async function getDataChain(chain) {
  const STAKING_ADDRESS = '0x985e8A89Dd6Af8896Ef075c8dd93512433dc5829';
  const INVESTING_ADDRESS = '0xc186fA914353c44b2E33eBE05f21846F1048bEda';

  let result = [];
  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  for (const underlying_token of infoToken) {
    const investingPool = new ethers.Contract(
      INVESTING_ADDRESS,
      ROUTERABI,
      provider,
    );

    const poolInfo = await investingPool.pooledTokens(underlying_token);
    const poolAddress = poolInfo.lpToken;

    const Pool = new ethers.Contract(poolAddress, LP, provider);
    const poolName = await Pool.name();

    // const stakingPool = new ethers.Contract(
    //   STAKING_ADDRESS,
    //   ROUTERABI,
    //   provider,
    // );

    // const reward_token = '';

    const info = {
      name: 'Across - ' + poolName,
      chain: chain,
      underlying_tokens: [underlying_token.toLowerCase()],
      pool_address: poolAddress,
      investing_address: INVESTING_ADDRESS.toLowerCase(),
      staking_address: STAKING_ADDRESS.toLowerCase(),
      boosting_address: null,
      distributor_address: STAKING_ADDRESS.toLowerCase(),
      rewards_tokens: [''],
      metadata: {},
    };

    console.log(info);

    result = [...result, info];
  }

  return result;
}

async function generatePools() {
  let result = [];
  const CHAINS = ['ethereum'];
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
