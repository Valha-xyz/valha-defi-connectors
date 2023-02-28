const POOLS = [
  {
    name: 'Pool Instadapp ETH v2',
    chain: 'ethereum',
    underlying_tokens: ['0xae7ab96520de3a18e5e111b5eaab095312d7fe84'],
    pool_address: '0xa0d3707c569ff8c87fa923d3823ec5d81c98be78',
    investing_address: '0xa0d3707c569ff8c87fa923d3823ec5d81c98be78',
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
