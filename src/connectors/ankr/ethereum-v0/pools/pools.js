const POOLS = [
  {
    name: 'ETH Staking Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb',
    investing_address: '0x84db6ee82b7cf3b47e8f19270abde5718b936670',
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
