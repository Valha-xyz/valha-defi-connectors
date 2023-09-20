const POOLS = [
  {
    name: 'Pool WETH',
    chain: 'optimism',
    underlying_tokens: ['0x4200000000000000000000000000000000000006'],
    pool_address: '0x17533a1bDe957979E3977EbbFBC31E6deeb25C7d',
    investing_address: '0x17533a1bDe957979E3977EbbFBC31E6deeb25C7d',
    staking_address: '0xf75e85e9127039b4cf818118CC8c5b257EdF6684',
    boosting_address: null,
    distributor_address: '0x970d6b8c1479ec2bfe5a82dc69cafe4003099bc0',
    rewards_tokens: ['0x00a35fd824c717879bf370e70ac6868b95870dfb'],
    metadata: {},
  },
  {
    name: 'Pool USDT',
    chain: 'optimism',
    underlying_tokens: ['0x94b008aA00579c1307B0EF2c499aD98a8ce58e58'],
    pool_address: '0x874c01c2d1767efa01fa54b2ac16be96fad5a742',
    investing_address: '0x874c01c2d1767efa01fa54b2ac16be96fad5a742',
    staking_address: '0x46E10daf72233Dc9e807C7Fa3f808C0eac3909fc',
    boosting_address: null,
    distributor_address: '0x970d6b8c1479ec2bfe5a82dc69cafe4003099bc0',
    rewards_tokens: ['0x00a35fd824c717879bf370e70ac6868b95870dfb'],
    metadata: {},
  },
  {
    name: 'Pool DAI',
    chain: 'optimism',
    underlying_tokens: ['0xda10009cbd5d07dd0cecc66161fc93d7c9000da1'],
    pool_address: '0x049E04bEE77cFfB055f733A138a2F204D3750283',
    investing_address: '0x049E04bEE77cFfB055f733A138a2F204D3750284',
    staking_address: '0xD52dF1Ea7b51B76cC831Ed68Ff93e92f80271617',
    boosting_address: null,
    distributor_address: '0x970d6b8c1479ec2bfe5a82dc69cafe4003099bc0',
    rewards_tokens: ['0x00a35fd824c717879bf370e70ac6868b95870dfb'],
    metadata: {},
  },
  {
    name: 'Pool WBTC',
    chain: 'optimism',
    underlying_tokens: ['0x68f180fcce6836688e9084f035309e29bf0a2095'],
    pool_address: '0xcdb9b4db65C913aB000b40204248C8A53185D14D',
    investing_address: '0xcdb9b4db65C913aB000b40204248C8A53185D14D',
    staking_address: '0xe1360b36449af40547F46edF61253D7Aa5A55396',
    boosting_address: null,
    distributor_address: '0x970d6b8c1479ec2bfe5a82dc69cafe4003099bc0',
    rewards_tokens: ['0x00a35fd824c717879bf370e70ac6868b95870dfb'],
    metadata: {},
  },
  {
    name: 'Pool OP',
    chain: 'optimism',
    underlying_tokens: ['0x4200000000000000000000000000000000000042'],
    pool_address: '0x4645e0952678E9566FB529D9313f5730E4e1C412',
    investing_address: '0x4645e0952678E9566FB529D9313f5730E4e1C412',
    staking_address: '0x553D42D966bF57a50f2D3a48A999845295309FbF',
    boosting_address: null,
    distributor_address: '0x970d6b8c1479ec2bfe5a82dc69cafe4003099bc0',
    rewards_tokens: ['0x00a35fd824c717879bf370e70ac6868b95870dfb'],
    metadata: {},
  },
  {
    name: 'Pool SUSD',
    chain: 'optimism',
    underlying_tokens: ['0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9'],
    pool_address: '0x04F0fd3CD03B17a3E5921c0170ca6dD3952841cA',
    investing_address: '0x04F0fd3CD03B17a3E5921c0170ca6dD3952841cA',
    staking_address: '0xb548db1746Aa5468d444C7231876aBDC6Bf0bD61',
    boosting_address: null,
    distributor_address: '0x970d6b8c1479ec2bfe5a82dc69cafe4003099bc0',
    rewards_tokens: ['0x00a35fd824c717879bf370e70ac6868b95870dfb'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
