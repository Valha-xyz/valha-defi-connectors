const POOLS = [
  {
    name: 'wstETH',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    investing_address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: null,
    metadata: {}
  }
]

/// pools
async function pools () {
  return POOLS
}

module.exports = pools
