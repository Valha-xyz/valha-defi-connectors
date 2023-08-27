const POOLS = [
  {
    name: 'USDT/USDC/DAI Pool',
    chain: 'ethereum',
    underlying_tokens: ['0x6B175474E89094C44Da98b954EedeAC495271d0F','0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48','0xdAC17F958D2ee523a2206206994597C13D831ec7'],
    pool_address: '0x1b84765de8b7566e4ceaf4d0fd3c5af52d3dde4f',
    investing_address: '0x1116898dda4015ed8ddefb84b6e8bc24528af2d8',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x0f2D719407FdBeFF09D87557AbB7232601FD9F29'],
    metadata: {},
  },
  {
    name: 'NUSD/USDC/USDT Pool',
    chain: 'arbitrum',
    underlying_tokens: ['0x2913E812Cf0dcCA30FB28E6Cac3d2DCFF4497688','0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8','0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'],
    pool_address: '0xcfd72be67ee69a0dd7cf0f846fc0d98c33d60f16',
    investing_address: '0x9dd329f5411466d9e0c488ff72519ca9fef0cb40',
    staking_address: '0x73186f2Cf2493f20836b17b21ae79fc12934E207',
    boosting_address: null,
    distributor_address: '0x73186f2Cf2493f20836b17b21ae79fc12934E207',
    rewards_tokens: ['0x080F6AEd32Fc474DD5717105Dba5ea57268F46eb'],
    metadata: {},
  }
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
