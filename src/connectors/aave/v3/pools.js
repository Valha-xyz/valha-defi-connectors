const POOLS = [
  {
    name: 'DAI pool',
    chain: 'optimism',
    underlying_tokens: ['0xda10009cbd5d07dd0cecc66161fc93d7c9000da1'],
    pool_address: '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
    investing_address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: null,
    metadata: {},
  },
  {
    name: 'USDC pool',
    chain: 'optimism',
    underlying_tokens: ['0x7f5c764cbc14f9669b88837ca1490cca17c316'],
    pool_address: '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
    investing_address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: null,
    metadata: {},
  },
  {
    name: 'USDT pool',
    chain: 'optimism',
    underlying_tokens: ['0x94b008aa00579c1307b0ef2c499ad98a8ce58e58'],
    pool_address: '0x6ab707aca953edaefbc4fd23ba73294241490620',
    investing_address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: null,
    metadata: {},
  },
  {
    name: 'SUSD pool',
    chain: 'optimism',
    underlying_tokens: ['0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9'],
    pool_address: '0x6d80113e533a2c0fe82eabd35f1875dcea89ea97',
    investing_address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: null,
    metadata: {},
  },
  {
    name: 'WETH pool',
    chain: 'optimism',
    underlying_tokens: ['0x4200000000000000000000000000000000000006'],
    pool_address: '0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8',
    investing_address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
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
