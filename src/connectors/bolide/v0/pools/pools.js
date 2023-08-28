const POOLS = [
  {
    name: 'USDT Pool',
    chain: 'polygon',
    underlying_tokens: ['0xc2132D05D31c914a87C6611C10748AEb04B58e8F'],
    pool_address: '0x0aF9F3297f34921Acd5Ac81970929964c9f3d0a7',
    investing_address: '0x0aF9F3297f34921Acd5Ac81970929964c9f3d0a7',
    staking_address: null,
    boosting_address: '0x0aF9F3297f34921Acd5Ac81970929964c9f3d0a7',
    distributor_address: null,
    rewards_tokens: ['0x4b27Cd6E6a5E83d236eAD376D256Fe2F9e9f0d2E'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
