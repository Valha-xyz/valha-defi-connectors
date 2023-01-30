const POOLS = [
  {
    name: 'Pool Name',
    chain: 'ethereum',
    underlying_tokens: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'],
    pool_address: '0x0000000000000000000000000000000000000000',
    investing_address: '0x0000000000000000000000000000000000000000',
    staking_address: '0x0000000000000000000000000000000000000000',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x0000000000000000000000000000000000000000'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
