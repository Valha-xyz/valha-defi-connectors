const POOLS = [
  {
    name: 'qisAVAX',
    chain: 'avalanche',
    underlying_tokens: ['0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE'],
    pool_address: '0xf362fea9659cf036792c9cb02f8ff8198e21b4cb',
    investing_address: '0xf362fea9659cf036792c9cb02f8ff8198e21b4cb',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiBTC.b',
    chain: 'avalanche',
    underlying_tokens: ['0x152b9d0FdC40C096757F570A51E494bd4b943E50'],
    pool_address: '0x89a415b3d20098e6a6c8f7a59001c67bd3129821',
    investing_address: '0x89a415b3d20098e6a6c8f7a59001c67bd3129821',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiBTC',
    chain: 'avalanche',
    underlying_tokens: ['0x50b7545627a5162f82a992c33b87adc75187b218'],
    pool_address: '0xe194c4c5ac32a3c9ffdb358d9bfd523a0b6d1568',
    investing_address: '0xe194c4c5ac32a3c9ffdb358d9bfd523a0b6d1568',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiETH',
    chain: 'avalanche',
    underlying_tokens: ['0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab'],
    pool_address: '0x334ad834cd4481bb02d09615e7c11a00579a7909',
    investing_address: '0x334ad834cd4481bb02d09615e7c11a00579a7909',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiLINK',
    chain: 'avalanche',
    underlying_tokens: ['0x5947bb275c521040051d82396192181b413227a3'],
    pool_address: '0x4e9f683a27a6bdad3fc2764003759277e93696e6',
    investing_address: '0x4e9f683a27a6bdad3fc2764003759277e93696e6',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiUSDT',
    chain: 'avalanche',
    underlying_tokens: ['0xc7198437980c041c805a1edcba50c1ce5db95118'],
    pool_address: '0xc9e5999b8e75c3feb117f6f73e664b9f3c8ca65c',
    investing_address: '0xc9e5999b8e75c3feb117f6f73e664b9f3c8ca65c',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiUSDC',
    chain: 'avalanche',
    underlying_tokens: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664'],
    pool_address: '0xbeb5d47a3f720ec0a390d04b4d41ed7d9688bc7f',
    investing_address: '0xbeb5d47a3f720ec0a390d04b4d41ed7d9688bc7f',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiUSDTn',
    chain: 'avalanche',
    underlying_tokens: ['0x6b3595068778dd592e39a122f4f5a5cf09c90fe2'],
    pool_address: '0xd8fcda6ec4bdc547c0827b8804e89acd817d56ef',
    investing_address: '0xd8fcda6ec4bdc547c0827b8804e89acd817d56ef',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiUSDCn',
    chain: 'avalanche',
    underlying_tokens: ['0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e'],
    pool_address: '0xb715808a78f6041e46d61cb123c9b4a27056ae9c',
    investing_address: '0xb715808a78f6041e46d61cb123c9b4a27056ae9c',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiDAI',
    chain: 'avalanche',
    underlying_tokens: ['0xd586e7f844cea2f87f50152665bcbc2c279d8d70'],
    pool_address: '0x835866d37afb8cb8f8334dccdaf66cf01832ff5d',
    investing_address: '0x835866d37afb8cb8f8334dccdaf66cf01832ff5d',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiBUSD',
    chain: 'avalanche',
    underlying_tokens: ['0x9c9e5fd8bbc25984b178fdce6117defa39d2db39'],
    pool_address: '0x872670ccae8c19557cc9443eff587d7086b8043a',
    investing_address: '0x872670ccae8c19557cc9443eff587d7086b8043a',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiQI',
    chain: 'avalanche',
    underlying_tokens: ['0x8729438eb15e2c8b576fcc6aecda6a148776c0f5'],
    pool_address: '0x35bd6aeda81a7e5fc7a7832490e71f757b0cd9ce',
    investing_address: '0x35bd6aeda81a7e5fc7a7832490e71f757b0cd9ce',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
  {
    name: 'qiAVAX',
    chain: 'avalanche',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0x5c0401e81bc07ca70fad469b451682c0d747ef1c',
    investing_address: '0x5c0401e81bc07ca70fad469b451682c0d747ef1c',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x486af39519b4dc9a7fccd318217352830e8ad9b4',
    rewards_tokens: [
      '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
