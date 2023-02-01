const POOLS = [
  {
    name: 'Wintermute',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x0Aea75705Be8281f4c24c3E954D1F8b1D0f8044C',
    investing_address: '0x0Aea75705Be8281f4c24c3E954D1F8b1D0f8044C',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x312853485a41f76f20A14f927Cd0ea676588936C',
    rewards_tokens: ['0x6123b0049f904d730db3c36a31167d9d4121fa6b'],
    metadata: {}
  },
  {
    name: 'Folkvang',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x3CD0ecf1552D135b8Da61c7f44cEFE93485c616d',
    investing_address: '0x3CD0ecf1552D135b8Da61c7f44cEFE93485c616d',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x312853485a41f76f20A14f927Cd0ea676588936C',
    rewards_tokens: ['0x6123b0049f904d730db3c36a31167d9d4121fa6b'],
    metadata: {}
  }
]

/// pools
async function pools () {
  return POOLS
}

module.exports = pools
