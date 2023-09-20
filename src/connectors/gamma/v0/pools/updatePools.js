/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
const { POOLABI } = require('../abi/POOL');

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

// could be retrieved here: https://docs.google.com/spreadsheets/d/19i8dQt-F3TncJ2jlYWOJ-cOmnleKvqz1rJiiv-QTS9M/edit#gid=0, needed as interaction address
const UNIPROXY = {
  ethereum: {
    uniswapv3: '0x83dE646A7125aC04950FEA7e322481D4BE66c71d',
    quickswap: '',
    zyberswap: '',
    thena: '',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  bsc: {
    uniswapv3: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f',
    quickswap: '',
    zyberswap: '',
    thena: '0x09fe94c281E2Bd8F95319135eB75F558CF69f717',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  polygon: {
    uniswapv3: '0xE339ecc9deEf6B69Dbc394ABf6fBFf19450fAEb6',
    quickswap: '0xA42d55074869491D60Ac05490376B74cF19B00e6',
    zyberswap: '',
    thena: '',
    retro: '0xDC8eE75f52FABF057ae43Bb4B85C55315b57186c',
    camelot: '',
    ramses: '',
    sushiswap: '0x4cb8B78deDA81081Ffe8003b44E1A6ef17108863',
    beamswap: '',
    stellaswap: '',
  },
  'polygon-zk': {
    quickswap: '0x8480199E5D711399ABB4D51bDa329E064c89ad77',
  },
  arbitrum: {
    uniswapv3: '0x22AE0dA638B4c4074A683045cCe759E8Ba990B1f',
    quickswap: '',
    zyberswap: '0x4a74b6CEc31A51a48A74106118c6c920Bc8d5f31',
    thena: '',
    retro: '',
    camelot: '0x1F1Ca4e8236CD13032653391dB7e9544a6ad123E',
    ramses: '0x564F9D9DF1D8bAA1a8202a38eF0a18600B127b7E',
    sushiswap: '0x530071b0373Ab3029cAd32E0c19b75253e231b69',
    beamswap: '',
    stellaswap: '',
  },
  optimism: {
    uniswapv3: '0x40a3E5778f66835265602f92D507AeC708c2C0AD',
    quickswap: '',
    zyberswap: '',
    thena: '',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  avalanche: {
    uniswapv3: '',
    quickswap: '',
    zyberswap: '',
    thena: '',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  celo: {
    uniswapv3: '0xD08B593eb3460B7aa5Ce76fFB0A3c5c938fd89b8',
  },
};

// could be retrieved here: https://docs.google.com/spreadsheets/d/19i8dQt-F3TncJ2jlYWOJ-cOmnleKvqz1rJiiv-QTS9M/edit#gid=0, not needed
const HYPEREGISTRY = {
  ethereum: {
    uniswapv3: '0x31CcDb5bd6322483bebD0787e1DABd1Bf1f14946',
    quickswap: '',
    zyberswap: '',
    thena: '',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  bsc: {
    uniswapv3: '0x0b4645179C1b668464Df01362fC6219a7ab3234c',
    quickswap: '',
    zyberswap: '',
    thena: '0xd4bcFC023736Db5617E5638748E127581d5929bd',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  polygon: {
    uniswapv3: '0x0Ac4C7b794f3D7e7bF1093A4f179bA792CF15055',
    quickswap: '0xAeC731F69Fa39aD84c7749E913e3bC227427Adfd',
    zyberswap: '',
    thena: '',
    retro: '0xcAC19d43C9558753d7535978A370055614Ce832E',
    camelot: '',
    ramses: '',
    sushiswap: '0x97686103B3E7238Ca6c2C439146B30adBd84a593',
    beamswap: '',
    stellaswap: '',
  },
  'polygon-zk': {
    quickswap: '0xD08B593eb3460B7aa5Ce76fFB0A3c5c938fd89b8',
  },
  arbitrum: {
    uniswapv3: '0x66CD859053c458688044d816117D5Bdf42A56813',
    quickswap: '',
    zyberswap: '0x37595FCaF29E4fBAc0f7C1863E3dF2Fe6e2247e9',
    thena: '',
    retro: '',
    camelot: '0xa216C2b6554A0293f69A1555dd22f4b7e60Fe907',
    ramses: '0x34Ffbd9Db6B9bD8b095A0d156de69a2AD2944666',
    sushiswap: '0x0f867F14b39a5892A39841a03bA573426DE4b1d0',
    beamswap: '',
    stellaswap: '',
  },
  optimism: {
    uniswapv3: '0xF5BFA20F4A77933fEE0C7bB7F39E7642A070d599',
    quickswap: '',
    zyberswap: '',
    thena: '',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  avalanche: {
    uniswapv3: '',
    quickswap: '',
    zyberswap: '',
    thena: '',
    retro: '',
    camelot: '',
    ramses: '',
    sushiswap: '',
    beamswap: '',
    stellaswap: '',
  },
  celo: {
    uniswapv3: '0x0F548d7AD1A0CB30D1872b8C18894484d76e1569',
  },
};

function getUrl_allData(chain, exchange) {
  if (chain === 'ethereum') {
    return `https://wire2.gamma.xyz/${exchange}hypervisors/allData`;
  }
  return `https://wire2.gamma.xyz/${exchange}${chain}/hypervisors/allData`;
}
function getUrl_allRewards2(chain, exchange) {
  if (chain === 'ethereum') {
    return `https://wire2.gamma.xyz/${exchange}allRewards2`;
  }
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
  if (!UNIPROXY[chain][exchange] || UNIPROXY[chain][exchange] === '') {
    return [];
  }
  const URL1 = getUrl_allData(chain, EXCHANGES_API[exchange]);
  const dataApyInfo = await axios.get(URL1);
  const length = Object.keys(dataApyInfo).length;

  let result = [];

  if (length == 1) {
    return result;
  } else {
    for (const address in dataApyInfo.data) {
      const data = dataApyInfo.data[address];
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

      console.log(info);

      result = [...result, info];
    }
    return result;
  }
}

async function generatePools() {
  let result = [];
  const CHAINS = [
    // 'optimism',
    'ethereum',
    // 'arbitrum',
    // 'bsc',
    // 'polygon',
    // 'celo',
  ];
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
