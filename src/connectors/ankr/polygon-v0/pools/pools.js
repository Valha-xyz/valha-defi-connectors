const POOLS = [
  {
    name: 'MATIC Staking Pool',
    chain: 'polygon',
    underlying_tokens: ['0x0000000000000000000000000000000000001010'],
    pool_address: '0x0e9b89007eee9c958c0eda24ef70723c2c93dd58',
    investing_address: '0x62a509ba95c75cabc7190469025e5abee4eddb2a',
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
