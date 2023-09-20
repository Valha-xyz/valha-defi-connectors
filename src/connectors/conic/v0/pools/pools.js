const POOLS = [
  {
    name: 'Pool FRAX',
    chain: 'ethereum',
    underlying_tokens: ['0x853d955acef822db058eb8505911ed77f175b99e'],
    pool_address: '0x208e23b59f448f7d72470ddd2f29fb52abd03f2c',
    investing_address: '0x40293380F5292Bb13905608b35a936c332f07f94',
    staking_address: '0xeC037423A61B634BFc490dcc215236349999ca3d',
    boosting_address: null,
    distributor_address: '0x968e4fc45856b4ec1a48b1c471afe21ea04e8e45',
    rewards_tokens: [
      '0x9aE380F0272E2162340a5bB646c354271c0F5cFC',
      '0xD533a949740bb3306d119CC777fa900bA034cd52',
      '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
    ],
    metadata: {},
  },
  {
    name: 'Pool USDC',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x472fcc880f01b32c55f1fb55f58f7bd930de1944',
    investing_address: '0x07b577f10d4e00f3018542d08a87f255a49175a5',
    staking_address: '0xeC037423A61B634BFc490dcc215236349999ca3d',
    boosting_address: null,
    distributor_address: '0xe976f643d4dc08aa3ced55b0ca391b1d11328347',
    rewards_tokens: [
      '0x9aE380F0272E2162340a5bB646c354271c0F5cFC',
      '0xD533a949740bb3306d119CC777fa900bA034cd52',
      '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
    ],
    metadata: {},
  },
  {
    name: 'Pool DAI',
    chain: 'ethereum',
    underlying_tokens: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    pool_address: '0x1a7b66b3fa6a29b7d8e5b38eacdb0a38b8081b07',
    investing_address: '0xAbb735648a076d570AfF2A61D8D141099823EAe9',
    staking_address: '0xeC037423A61B634BFc490dcc215236349999ca3d',
    boosting_address: null,
    distributor_address: '0x3af45d43896ed333f4b7098af90e838ef74bc98f',
    rewards_tokens: [
      '0x9aE380F0272E2162340a5bB646c354271c0F5cFC',
      '0xD533a949740bb3306d119CC777fa900bA034cd52',
      '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
    ],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
