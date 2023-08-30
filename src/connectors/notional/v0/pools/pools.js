const POOLS = [
  {
    name: 'nUSDC',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x18b0fc5a233acf1586da7c199ca9e3f486305a29',
    investing_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    rewards_tokens: ['0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5'],
    metadata: {},
  },
  {
    name: 'nDAI',
    chain: 'ethereum',
    underlying_tokens: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    pool_address: '0x6ebce2453398af200c688c7c4ebd479171231818',
    investing_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    rewards_tokens: ['0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5'],
    metadata: {},
  },
  {
    name: 'nETH',
    chain: 'ethereum',
    underlying_tokens: ['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
    pool_address: '0xabc07bf91469c5450d6941dd0770e6e6761b90d6',
    investing_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    rewards_tokens: ['0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5'],
    metadata: {},
  },
  {
    name: 'nWBTC',
    chain: 'ethereum',
    underlying_tokens: ['0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'],
    pool_address: '0x0ace2dc3995acd739ae5e0599e71a5524b93b886',
    investing_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x1344a36a1b56144c3bc62e7757377d288fde0369',
    rewards_tokens: ['0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5'],
    metadata: {},
  },
]

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
