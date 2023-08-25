const POOLS = [
  {
    name: 'BNBx',
    chain: 'bsc',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0x1bdd3cf7f79cfb8edbb955f20ad99211551ba275',
    investing_address: '0x7276241a669489e4bbb76f63d2a43bfe63080f2f',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
