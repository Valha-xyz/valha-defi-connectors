const POOLS = [
  {
    name: 'frxETH',
    chain: 'ethereum',
    underlying_tokens: ['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
    pool_address: '0x5e8422345238f34275888049021821e8e08caa1f',
    investing_address: '0xbafa44efe7901e04e39dad13167d089c559c1138',
    staking_address: '0xac3e018457b222d93114458476f3e3416abbe38f',
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
