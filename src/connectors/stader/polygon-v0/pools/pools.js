const POOLS = [
  {
    name: 'MATICx',
    chain: 'polygon',
    underlying_tokens: ['0x0000000000000000000000000000000000001010'],
    pool_address: '0xfa68fb4628dff1028cfec22b4162fccd0d45efb6',
    investing_address: '0xfd225c9e6601c9d38d8f98d8731bf59efcf8c0e3',
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
