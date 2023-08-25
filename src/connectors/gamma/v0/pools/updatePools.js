/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const POOLABI = require('../abi/POOL');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { ethers } = require('ethers');

const EXCHANGES_API = {
  uniswapv3: '',
  quickswap: 'quickswap/',
  zyberswap: 'zyberswap/',
  thena: 'thena/',
  retro: 'retro/',
  camelot: 'camelot/',
  ramses: 'ramses/',
  sushiswap: 'sushi/',
  beamswap: 'beamswap/',
  stellaswap: 'stellaswap/',
};

const UNIPROXY = {
  // could be retrieved here: https://docs.google.com/spreadsheets/d/19i8dQt-F3TncJ2jlYWOJ-cOmnleKvqz1rJiiv-QTS9M/edit#gid=0, needed as interaction address
};

const HYPEREGISTRY = {
  // could be retrieved here: https://docs.google.com/spreadsheets/d/19i8dQt-F3TncJ2jlYWOJ-cOmnleKvqz1rJiiv-QTS9M/edit#gid=0, not needed
};

function getUrl_allData(chain, exchange) {
  return `https://wire2.gamma.xyz/${exchange}${chain}/hypervisors/allData`;
}
function getUrl_allRewards2(chain, exchange) {
  return `https://wire2.gamma.xyz/${exchange}${chain}/allRewards2`;
}
function findMasterchefByAddress(jsonData, targetAddress) {
  for (const masterchefKey in jsonData) {
    if (jsonData.hasOwnProperty(masterchefKey)) {
      const pools = jsonData[masterchefKey].pools;
      for (const poolAddress in pools) {
        if (
          pools.hasOwnProperty(poolAddress) &&
          poolAddress === targetAddress
        ) {
          return masterchefKey;
        }
      }
    }
  }
  return null; // Address not found
}
function getRewardTokensForPool(data, poolAddress) {
  const poolData = data[poolAddress];
  if (!poolData || !poolData.pools) {
    return [];
  }
  const pool = poolData.pools[poolAddress];
  if (!pool || !pool.rewarders) {
    return [];
  }
  const rewarders = pool.rewarders;
  const rewardTokens = Object.values(rewarders).map((rewarder) => {
    return rewarder.rewardToken;
  });
  return rewardTokens;
}

async function getDataChain(chain, exchange) {
  const URL1 = getUrl_allData(chain, EXCHANGES_API[exchange]);
  const dataApy = await axios.get(URL1);
  const length = Object.keys(dataApy).length;

  let result = [];

  if (length == 1) {
    return result;
  } else {
    for (const address in dataApy.data) {
      const data = dataApy.data[address];
      const poolAddress = address;
      const name = data.name;
      const underlyingTokens = [data.token0, data.token1];
      const investingAddress = UNIPROXY[chain][exchange];

      const URL2 = getUrl_allRewards2(chain, EXCHANGES_API[exchange]);
      const dataApy = await axios.get(URL2);

      const stakingAddress = findMasterchefByAddress(dataApy.data, poolAddress);
      const rewardsTokens = getRewardTokensForPool(dataApy.data, poolAddress);

      const provider = getNodeProvider(chain);
      if (!provider) throw new Error('No provider was found.');
      const poolContract = new ethers.Contract(poolAddress, POOLABI, provider);
      const directDeposit = await poolContract.directDeposit(); // needed for interactions

      const info = {
        name,
        chain,
        underlying_tokens: underlyingTokens,
        pool_address: poolAddress,
        investing_address: investingAddress,
        staking_address: stakingAddress,
        boosting_address: null,
        distributor_address: stakingAddress,
        rewards_tokens: rewardsTokens,
        metadata: {
          exchange,
          hypeRegistry: HYPEREGISTRY[chain][exchange],
          directDeposit,
        },
      };

      result = [...result, info];
    }
    return result;
  }
}

async function generatePools() {
  let result = [];
  const CHAINS = ['optimism', 'ethereum', 'arbitrum', 'bsc', 'polygon', 'celo'];
  const EXCHANGES = [
    'uniswapv3',
    'quickswap',
    'zyberswap',
    'thena',
    'retro',
    'camelot',
    'ramses',
    'sushiswap',
    'beamswap',
    'stellaswap',
  ];
  for (const chain of CHAINS) {
    for (const exchange of EXCHANGES) {
      const pools = await getDataChain(chain, exchange);
      result = [...result, ...pools];
    }
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
