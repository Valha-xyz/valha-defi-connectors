const POOLS = [
  {
    name: 'Aladin Stake DAO CRV',
    chain: 'ethereum',
    underlying_tokens: ['0xd1b5651e55d4ceed36251c61c50c889b36f6abb5'],
    pool_address: '0x43e54c2e7b3e294de3a155785f52ab49d87b9922',
    investing_address: '0x43e54c2e7b3e294de3a155785f52ab49d87b9922',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {
      initial_tokens: ['0xd533a949740bb3306d119cc777fa900ba034cd52'],
    },
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
