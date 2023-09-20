/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { ROUTERABI } = require('../abi/Router');
const { LP } = require('../abi/LP');
const ethers = require('ethers');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');

const info = {
  arbitrum: {
    SYN_TOKEN_ADDRESS: '0x080F6AEd32Fc474DD5717105Dba5ea57268F46eb',
    LP_STAKING_ADDRESS: '0x73186f2Cf2493f20836b17b21ae79fc12934E207',
    Pools: [
      '0xa067668661C84476aFcDc6fA5D758C4c01C34352', // nETH - WETH (8m)
      '0x9Dd329F5411466d9e0C488fF72519CA9fEf0cb40', // 3Pool (USDC - USDT - nUSD) (12m)
      '0x0Db3FE3B770c95A0B99D1Ed6F2627933466c0Dd8', // nETH - WETH (8m)
    ],
  },
  avalanche: {
    SYN_TOKEN_ADDRESS: '0x1f1E7c893855525b303f99bDF5c3c05Be09ca251',
    LP_STAKING_ADDRESS: '0x3a01521F8E7F012eB37eAAf1cb9490a5d9e18249',
    Pools: [
      '0xED2a7edd7413021d440b09D654f3b87712abAB66', // nUSD, DAI, USDC, USDT (10m)
      '0x77a7e60555bC18B4Be44C181b2575eee46212d44', // avWETH, nETH (6m)
    ],
    formattedChainName: 'Avalanche',
  },
  base: {
    SYN_TOKEN_ADDRESS: '0x432036208d2717394d2614d6697c46DF3Ed69540',
    LP_STAKING_ADDRESS: '0xfFC2d603fde1F99ad94026c00B6204Bb9b8c36E9',
    Pools: [
      '0x6223bD82010E2fB69F329933De20897e7a4C225f', // nETH ETH (13m)
    ],
  },
  ethereum: {
    SYN_TOKEN_ADDRESS: '0x0f2D719407FdBeFF09D87557AbB7232601FD9F29',
    LP_STAKING_ADDRESS: '0xd10eF2A513cEE0Db54E959eF16cAc711470B62cF',
    Pools: [
      '0x1116898DdA4015eD8dDefb84b6e8Bc24528Af2d8', // DAI, USDC, USDT (17m)
    ],
  },
  optimism: {
    SYN_TOKEN_ADDRESS: '0x5A5fFf6F753d7C11A56A52FE47a177a87e431655',
    LP_STAKING_ADDRESS: '0xe8c610fcb63A4974F02Da52f0B4523937012Aaa0',
    Pools: [
      '0xE27BFf97CE92C3e1Ff7AA9f86781FDd6D48F5eE9', // nETH ETH (3m)
      '0xF44938b0125A6662f9536281aD2CD6c499F22004', // nUSD USDC (4m)
    ],
  },
  polygon: {
    SYN_TOKEN_ADDRESS: '0xf8F9efC0db77d8881500bb06FF5D6ABc3070E695',
    LP_STAKING_ADDRESS: '0x7875Af1a6878bdA1C129a4e2356A3fD040418Be5',
    Pools: [
      '0x85fCD7Dd0a1e1A9FCD5FD886ED522dE8221C3EE5', // USDC USDT nUSDC DAI (8m)
    ],
  },
};

async function getDataChain(chain) {
  const poolInfo = info[chain];
  const SYN_TOKEN = poolInfo.SYN_TOKEN_ADDRESS;
  const STAKING_ADDRESS = poolInfo.LP_STAKING_ADDRESS;
  const INVESTING_ADDRESSES = poolInfo.Pools;

  let result = [];

  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  for (const investing_address of INVESTING_ADDRESSES) {
    console.log(investing_address);
    const investingPool = new ethers.Contract(
      investing_address,
      ROUTERABI,
      provider,
    );

    const swapStorageInfo = await investingPool.swapStorage();

    console.log(swapStorageInfo);

    const poolAddress = swapStorageInfo.lpToken.toLowerCase();
    console.log(poolAddress);

    const underlyingTokens = [];

    for (let i = 0; i < 10; i++) {
      try {
        const token = await investingPool.getToken(i);
        underlyingTokens.push(token.toLowerCase());
      } catch (err) {
        break;
      }
    }

    const Pool = new ethers.Contract(poolAddress, LP, provider);

    const poolName = await Pool.name();

    const info = {
      name: 'Synapse - ' + poolName,
      chain: chain,
      underlying_tokens: underlyingTokens,
      pool_address: poolAddress,
      investing_address: investing_address.toLowerCase(),
      staking_address: STAKING_ADDRESS.toLowerCase(),
      boosting_address: null,
      distributor_address: STAKING_ADDRESS.toLowerCase(),
      rewards_tokens: [SYN_TOKEN],
      metadata: {},
    };

    console.log(info);

    result = [...result, info];
  }

  return result;
}

async function generatePools() {
  let result = [];
  const CHAINS = [
    'optimism',
    'avalanche',
    'polygon',
    'ethereum',
    'arbitrum',
    // 'base',
  ];
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
