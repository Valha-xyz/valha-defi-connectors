const POOLS = [
  {
    name: 'Coinbase Liquid Staking ETH - cbETH',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xbe9895146f7af43049ca1c1ae358b0541ea49704',
    investing_address: null,
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {
      secondary: true,
      secondary_only: true,
    },
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
