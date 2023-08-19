const POOLS = [
  {
    name: 'sDai',
    chain: 'ethereum',
    underlying_tokens: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    pool_address: '0x83f20f44975d03b1b09e64809b757c47f942beea',
    investing_address: '0x83f20f44975d03b1b09e64809b757c47f942beea',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {}
  }
]

/// pools
async function pools () {
  return POOLS
}

module.exports = pools
