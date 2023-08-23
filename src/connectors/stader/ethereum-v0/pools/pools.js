const POOLS = [
  {
    name: 'ETHx',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
    investing_address: '0xcf5ea1b38380f6af39068375516daf40ed70d299',
    staking_address: '0x9f0491b32dbce587c50c4c43ab303b06478193a7',
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
