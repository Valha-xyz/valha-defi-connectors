const POOLS = [
  {
    name: 'Rocket Staking Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xae78736Cd615f374D3085123A210448E74Fc6393',
    investing_address: '0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4',
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
