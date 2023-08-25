const POOLS = [
  {
    name: 'Pool Celo',
    chain: 'celo',
    underlying_tokens: ['0x471ece3750da237f93b8e339c536989b8978a438'],
    pool_address: '0x7D00cd74FF385c955EA3d79e47BF06bD7386387D',
    investing_address: '0x970b12522CA9b4054807a2c5B736149a5BE6f670',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: 'Pool cUSDC',
    chain: 'celo',
    underlying_tokens: ['0x765de816845861e75a25fca122bb6898b8b1282a'],
    pool_address: '0x918146359264C492BD6934071c6Bd31C854EDBc3',
    investing_address: '0x970b12522CA9b4054807a2c5B736149a5BE6f670',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: 'Pool cEUR',
    chain: 'celo',
    underlying_tokens: ['0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73'],
    pool_address: '0xE273Ad7ee11dCfAA87383aD5977EE1504aC07568',
    investing_address: '0x970b12522CA9b4054807a2c5B736149a5BE6f670',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: 'Pool cREAL',
    chain: 'celo',
    underlying_tokens: ['0xe8537a3d056da446677b9e9d6c5db704eaab4787'],
    pool_address: '0x9802d866fdE4563d088a6619F7CeF82C0B991A55',
    investing_address: '0x970b12522CA9b4054807a2c5B736149a5BE6f670',
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
