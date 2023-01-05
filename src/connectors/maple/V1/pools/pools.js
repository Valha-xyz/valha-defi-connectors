const POOLS = [
  {
    name: 'Maven 11 wETH',
    chain: 'ethereum',
    underlying_tokens: ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
    pool_address: '0x1a066b0109545455bc771e49e6edef6303cb0a93',
    investing_address: '0x1a066b0109545455bc771e49e6edef6303cb0a93',
    staking_address: '0x0a76c7913c94f2af16958fbdf9b4cf0bbdb159d8',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x33349b282065b0284d756f0577fb39c158f935e6'],
    metadata: {},
  },
  {
    name: 'Maven 11',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x6f6c8013f639979c84b756c7fc1500eb5af18dc4',
    investing_address: '0x6f6c8013f639979c84b756c7fc1500eb5af18dc4',
    staking_address: '0x7c57bf654bc16b0c9080f4f75ff62876f50b8259',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x33349b282065b0284d756f0577fb39c158f935e6'],
    metadata: {},
  },
  {
    name: 'Icebreaker',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x733f56782d21b403e5ee9c8343645e1535f73cd4',
    investing_address: '0x733f56782d21b403e5ee9c8343645e1535f73cd4',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x33349b282065b0284d756f0577fb39c158f935e6'],
    metadata: {},
  },
  {
    name: 'Maven 11 Permissioned',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0xcc8058526de295c6ad917cb41416366d69a24cde',
    investing_address: '0xcc8058526de295c6ad917cb41416366d69a24cde',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x33349b282065b0284d756f0577fb39c158f935e6'],
    metadata: {},
  },
  {
    name: 'Orthogonal Trading',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0xfebd6f15df3b73dc4307b1d7e65d46413e710c27',
    investing_address: '0xfebd6f15df3b73dc4307b1d7e65d46413e710c27',
    staking_address: '0x7869d7a3b074b5fa484dc04798e254c9c06a5e90',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x33349b282065b0284d756f0577fb39c158f935e6'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
