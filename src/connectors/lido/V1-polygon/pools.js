const POOLS = [
  {
    name: 'Matic Liquid Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0x9ee91F9f426fA633d227f7a9b000E28b9dfd8599',
    investing_address: '0x9ee91F9f426fA633d227f7a9b000E28b9dfd8599',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: null,
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
