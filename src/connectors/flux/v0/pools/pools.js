const POOLS = [
  {
    name: 'Flux USDC',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x465a5a630482f3abd6d3b84b39b29b07214d19e5',
    investing_address: '0x465a5a630482f3abd6d3b84b39b29b07214d19e5',
    staking_address: '',
    boosting_address: null,
    distributor_address: '',
    rewards_tokens: [''],
    metadata: {},
  },
  {
    name: 'Flux DAI',
    chain: 'ethereum',
    underlying_tokens: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    pool_address: '0xe2ba8693ce7474900a045757fe0efca900f6530b',
    investing_address: '0xe2ba8693ce7474900a045757fe0efca900f6530b',
    staking_address: '',
    boosting_address: null,
    distributor_address: '',
    rewards_tokens: [''],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
