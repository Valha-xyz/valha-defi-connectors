const POOLS = [
  {
    name: 'sETH2',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xfe2e637202056d30016725477c5da089ab0a043a',
    investing_address: '0xC874b064f465bdD6411D45734b56fac750Cda29A',
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
