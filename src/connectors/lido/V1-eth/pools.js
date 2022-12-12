const POOLS = [
  {
    name: 'ETH Liquid Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    investing_address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
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
