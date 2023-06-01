const POOLS = [
  {
    name: 'oBTCB',
    chain: 'bsc',
    underlying_tokens: ['0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'],
    pool_address: '0x5fce5D208DC325ff602c77497dC18F8EAdac8ADA',
    investing_address: '0x5fce5D208DC325ff602c77497dC18F8EAdac8ADA',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  }
  ,
  {
    name: 'oETH',
    chain: 'bsc',
    underlying_tokens: ['0x2170ed0880ac9a755fd29b2688956bd959f933f8 '],
    pool_address: '0xaA1b1E1f251610aE10E4D553b05C662e60992EEd',
    investing_address: '0xaA1b1E1f251610aE10E4D553b05C662e60992EEd',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  },
  {
    name: 'oBUSD',
    chain: 'bsc',
    underlying_tokens: ['0xe9e7cea3dedca5984780bafc599bd69add087d56'],
    pool_address: '0x0096b6b49d13b347033438c4a699df3afd9d2f96',
    investing_address: '0x0096b6b49d13b347033438c4a699df3afd9d2f96',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  },
  {
    name: 'oUSDC',
    chain: 'bsc',
    underlying_tokens: ['0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'],
    pool_address: '0x91b66a9ef4f4cad7f8af942855c37dd53520f151',
    investing_address: '0x91b66a9ef4f4cad7f8af942855c37dd53520f151',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  },
  {
    name: 'oUSDT',
    chain: 'ethereum',
    underlying_tokens: ['0x55d398326f99059ff775485246999027b3197955'],
    pool_address: '0xdBFd516D42743CA3f1C555311F7846095D85F6Fd',
    investing_address: '0xdBFd516D42743CA3f1C555311F7846095D85F6Fd',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  },
  {
    name: 'oCAKE',
    chain: 'bsc',
    underlying_tokens: ['0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82 '],
    pool_address: '0x3353f5bcfD7E4b146F2eD8F1e8D875733Cd754a7',
    investing_address: '0x3353f5bcfD7E4b146F2eD8F1e8D875733Cd754a7',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  },
  {
    name: 'oDOT',
    chain: 'bsc',
    underlying_tokens: ['0x7083609fce4d1d8dc0c979aab8c869ea2c873402'],
    pool_address: '0x92D106c39aC068EB113B3Ecb3273B23Cd19e6e26',
    investing_address: '0x92D106c39aC068EB113B3Ecb3273B23Cd19e6e26',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  },
  {
    name: 'oBNB',
    chain: 'bsc',
    underlying_tokens: ['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
    pool_address: '0x34878f6a484005aa90e7188a546ea9e52b538f6f',
    investing_address: '0x34878f6a484005aa90e7188a546ea9e52b538f6f',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  },
  {
    name: 'oBANANA',
    chain: 'bsc',
    underlying_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    pool_address: '0xc2e840bdd02b4a1d970c87a912d8576a7e61d314',
    investing_address: '0xc2e840bdd02b4a1d970c87a912d8576a7e61d314',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x5CB93C0AdE6B7F2760Ec4389833B0cCcb5e4efDa',
    rewards_tokens: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
    metadata: {},
  }
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
