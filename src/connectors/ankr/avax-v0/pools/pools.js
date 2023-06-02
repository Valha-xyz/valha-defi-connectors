const POOLS = [
  {
    name: 'AVAX Staking Pool',
    chain: 'avalanche',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xc3344870d52688874b06d844E0C36cc39FC727F6',
    investing_address: '0x7baa1e3bfe49db8361680785182b80bb420a836d',
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
