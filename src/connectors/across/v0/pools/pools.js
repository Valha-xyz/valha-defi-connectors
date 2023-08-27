const POOLS = [
  {
    name: 'WETH Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
    pool_address: '0x28f77208728b0a45cab24c4868334581fe86f95b',
    investing_address: '0xc186fa914353c44b2e33ebe05f21846f1048beda',
    staking_address: '0x9040e41ef5e8b281535a96d9a48acb8cfabd9a48',
    boosting_address: null,
    distributor_address: '0x9040e41ef5e8b281535a96d9a48acb8cfabd9a48',
    rewards_tokens: ['0x44108f0223a3c3028f5fe7aec7f9bb2e66bef82f'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
