const POOLS = [
  {
    name: 'swETH',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xf951e335afb289353dc249e82926178eac7ded78',
    investing_address: '0xf951e335afb289353dc249e82926178eac7ded78',
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
