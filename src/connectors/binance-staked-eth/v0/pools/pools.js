const POOLS = [
  {
    name: 'wBETH',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    investing_address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {},
  }
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
