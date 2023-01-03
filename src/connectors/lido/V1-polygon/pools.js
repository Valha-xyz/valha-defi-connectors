const POOLS = [
  {
    name: 'Matic Liquid Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4',
    investing_address: '0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4',
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
