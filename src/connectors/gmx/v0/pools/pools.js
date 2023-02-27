const POOLS = [
  {
    name: 'GMX Earn',
    chain: 'arbitrum',
    underlying_tokens: ['0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'],
    pool_address: '',
    investing_address: '0xa906f338cb21815cbc4bc87ace9e68c87ef8d8f1',
    staking_address: '0x0000000000000000000000000000000000000000',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x0000000000000000000000000000000000000000'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
