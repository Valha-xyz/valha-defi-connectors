const POOLS = [
  {
    name: 'GMX Earn',
    chain: 'arbitrum',
    underlying_tokens: ['0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'],
    pool_address: '0x1addd80e6039594ee970e5872d247bf0414c8903',
    investing_address: '0xa906f338cb21815cbc4bc87ace9e68c87ef8d8f1',
    staking_address: '',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0xf42ae1d54fd613c9bb14810b0588faaa09a426ca'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
