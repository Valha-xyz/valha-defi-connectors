const POOLS = [
  {
    name: 'ETHx',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
    investing_address: '0xcf5ea1b38380f6af39068375516daf40ed70d299',
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
