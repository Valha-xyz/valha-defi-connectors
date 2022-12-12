const POOLS = [
  {
    name: 'BUSD pool',
    chain: 'ethereum',
    underlying_tokens: ['0x4Fabb145d64652a948d72533023f6E7A623C7C53'],
    pool_address: '0x1Ed460D149D48FA7d91703bf4890F97220C09437',
    investing_address: '0x1Ed460D149D48FA7d91703bf4890F97220C09437',
    staking_address: '0xec6c3FD795D6e6f202825Ddb56E01b3c128b0b10',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x4c19596f5aaff459fa38b0f7ed92f11ae6543784'],
    metadata: {},
  },
  {
    name: 'USDC pool',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0xA991356d261fbaF194463aF6DF8f0464F8f1c742',
    investing_address: '0xA991356d261fbaF194463aF6DF8f0464F8f1c742',
    staking_address: '0xec6c3FD795D6e6f202825Ddb56E01b3c128b0b10',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x4c19596f5aaff459fa38b0f7ed92f11ae6543784'],
    metadata: {},
  },
  {
    name: 'TUSD pool',
    chain: 'ethereum',
    underlying_tokens: ['0x0000000000085d4780B73119b644AE5ecd22b376'],
    pool_address: '0x97cE06c3e3D027715b2d6C22e67D5096000072E5',
    investing_address: '0x97cE06c3e3D027715b2d6C22e67D5096000072E5',
    staking_address: '0xec6c3FD795D6e6f202825Ddb56E01b3c128b0b10',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x4c19596f5aaff459fa38b0f7ed92f11ae6543784'],
    metadata: {},
  },
  {
    name: 'USDT pool',
    chain: 'ethereum',
    underlying_tokens: ['0xdac17f958d2ee523a2206206994597c13d831ec7'],
    pool_address: '0x6002b1dcB26E7B1AA797A17551C6F487923299d7',
    investing_address: '0x6002b1dcB26E7B1AA797A17551C6F487923299d7',
    staking_address: '0xec6c3FD795D6e6f202825Ddb56E01b3c128b0b10',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x4c19596f5aaff459fa38b0f7ed92f11ae6543784'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
