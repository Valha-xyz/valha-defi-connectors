const POOLS = [
  {
    name: 'Pool Instadapp ETH v2',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xa0d3707c569ff8c87fa923d3823ec5d81c98be78',
    investing_address: '0xa13cea5fe07253075deae089d167854e8a7cf91d',
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
