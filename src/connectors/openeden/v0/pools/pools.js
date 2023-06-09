const POOLS = [
  {
    name: 'OpenEden T-BILLs',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0xad6250f0BD49F7a1eB11063af2cE9F25B9597b0F',
    investing_address: '0xad6250f0BD49F7a1eB11063af2cE9F25B9597b0F',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {},
  },
  // {
  //   name: 'OpenEden T-BILLs',
  //   chain: 'ethereum-goerli',
  //   underlying_tokens: ['0x13f7e836D0d0b0A2B1423af59DeC898ea3443e5E'],
  //   pool_address: '0xa3F9c4B42148a014F99869c27a1e10b668dFd903',
  //   investing_address: '0xa3F9c4B42148a014F99869c27a1e10b668dFd903',
  //   staking_address: null,
  //   boosting_address: null,
  //   distributor_address: null,
  //   rewards_tokens: [],
  //   metadata: {},
  // },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
