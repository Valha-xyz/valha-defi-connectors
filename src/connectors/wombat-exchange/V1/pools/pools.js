const POOLS = [
  {
    name: 'LP-USDT',
    chain: 'bsc',
    underlying_tokens: ['0x55d398326f99059ff775485246999027b3197955'],
    pool_address: '0x4f95fe57bea74b7f642cf9c097311959b9b988f7',
    investing_address: '0x312bc7eaaf93f1c60dc5afc115fccde161055fb0',
    staking_address: '0xe2c07d20af0fb50cae6cdd615ca44abaaa31f9c8',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0xAD6742A35fB341A9Cc6ad674738Dd8da98b94Fb1'],
    metadata: {}
  },
  {
    name: 'LP-DAI',
    chain: 'bsc',
    underlying_tokens: ['0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3'],
    pool_address: '0x9d0a463d5dcb82008e86bf506eb048708a15dd84',
    investing_address: '0x312bc7eaaf93f1c60dc5afc115fccde161055fb0',
    staking_address: '0xe2c07d20af0fb50cae6cdd615ca44abaaa31f9c8',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0xAD6742A35fB341A9Cc6ad674738Dd8da98b94Fb1'],
    metadata: {}
  },
  {
    name: 'LP-USDC',
    chain: 'bsc',
    underlying_tokens: ['0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'],
    pool_address: '0xb43ee2863370a56d3b7743edcd8407259100b8e2',
    investing_address: '0x312bc7eaaf93f1c60dc5afc115fccde161055fb0',
    staking_address: '0xe2c07d20af0fb50cae6cdd615ca44abaaa31f9c8',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0xAD6742A35fB341A9Cc6ad674738Dd8da98b94Fb1'],
    metadata: {}
  },
  {
    name: 'LP-BUSD',
    chain: 'bsc',
    underlying_tokens: ['0xe9e7cea3dedca5984780bafc599bd69add087d56'],
    pool_address: '0xf319947ece3823b790dd87b0a509396fe325745a',
    investing_address: '0x312bc7eaaf93f1c60dc5afc115fccde161055fb0',
    staking_address: '0xe2c07d20af0fb50cae6cdd615ca44abaaa31f9c8',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0xAD6742A35fB341A9Cc6ad674738Dd8da98b94Fb1'],
    metadata: {}
  }
]

/// pools
async function pools () {
  return POOLS
}

module.exports = pools
