const POOLS = [
  {
    name: 'GMX Earn',
    chain: 'arbitrum',
    underlying_tokens: ['0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'],
    pool_address: '0x1addd80e6039594ee970e5872d247bf0414c8903',
    investing_address: '0xb95db5b167d75e6d04227cfffa61069348d271f5',
    staking_address: '0xa906f338cb21815cbc4bc87ace9e68c87ef8d8f1',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [
      '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      '0xf42ae1d54fd613c9bb14810b0588faaa09a426ca',
    ],
    metadata: {
      weth_rewards: '0x4e971a87900b931ff39d1aad67697f49835400b6',
      vault: '0x489ee077994B6658eAfA855C308275EAd8097C4A',
    },
  },

  {
    name: 'GMX Earn',
    chain: 'avalanche',
    underlying_tokens: ['0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'],
    pool_address: '0x9e295b5b976a184b14ad8cd72413ad846c299660',
    investing_address: '0xb70b91ce0771d3f4c81d87660f71da31d48eb3b3',
    staking_address: '0x82147c5a7e850ea4e28155df107f2590fd4ba327',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [
      '0xFf1489227BbAAC61a9209A08929E4c2a526DdD17',
      '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    ],
    metadata: {
      weth_rewards: '0xd2d1162512f927a7e282ef43a362659e4f2a728f',
      vault: '0x9ab2De34A33fB459b538c43f251eB825645e8595',
    },
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
