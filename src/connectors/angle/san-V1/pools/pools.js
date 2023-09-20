const POOLS = [
  {
    name: 'Fei Pool',
    chain: 'ethereum',
    underlying_tokens: ['0x956F47F50A910163D8BF957Cf5846D573E7f87CA'],
    pool_address: '0x5d8D3Ac6D21C016f9C935030480B7057B21EC804',
    investing_address: '0x5adDc89785D75C86aB939E9e15bfBBb7Fc086A87',
    staking_address: '0x7c0fF11bfbFA3cC2134Ce62034329a4505408924',
    boosting_address: null,
    distributor_address: '0x7F82ff050128e29Fd89D85d01b93246F744E62A0',
    rewards_tokens: ['0x31429d1856ad1377a8a0079410b297e1a9e214c2'],
    metadata: {},
  },
  {
    name: 'USDC Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'],
    pool_address: '0x9C215206Da4bf108aE5aEEf9dA7caD3352A36Dad',
    investing_address: '0x5adDc89785D75C86aB939E9e15bfBBb7Fc086A87',
    staking_address: '0x51fE22abAF4a26631b2913E417c0560D547797a7',
    boosting_address: null,
    distributor_address: '0x7F82ff050128e29Fd89D85d01b93246F744E62A0',
    rewards_tokens: ['0x31429d1856ad1377a8a0079410b297e1a9e214c2'],
    metadata: {},
  },
  {
    name: 'Frax Pool',
    chain: 'ethereum',
    underlying_tokens: ['0x853d955aCEf822Db058eb8505911ED77F175b99e'],
    pool_address: '0xb3B209Bb213A5Da5B947C56f2C770b3E1015f1FE',
    investing_address: '0x5adDc89785D75C86aB939E9e15bfBBb7Fc086A87',
    staking_address: '0xb40432243E4F317cE287398e72Ab8f0312fc2FE8',
    boosting_address: null,
    distributor_address: '0x7F82ff050128e29Fd89D85d01b93246F744E62A0',
    rewards_tokens: ['0x31429d1856ad1377a8a0079410b297e1a9e214c2'],
    metadata: {},
  },
  {
    name: 'WETH Pool',
    chain: 'ethereum',
    underlying_tokens: ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
    pool_address: '0x30c955906735e48D73080fD20CB488518A6333C8',
    investing_address: '0x5adDc89785D75C86aB939E9e15bfBBb7Fc086A87',
    staking_address: null,
    boosting_address: null,
    distributor_address: '0x7F82ff050128e29Fd89D85d01b93246F744E62A0',
    rewards_tokens: ['0x31429d1856ad1377a8a0079410b297e1a9e214c2'],
    metadata: {},
  },
  {
    name: 'Dai Pool ',
    chain: 'ethereum',
    underlying_tokens: ['0x6B175474E89094C44Da98b954EedeAC495271d0F'],
    pool_address: '0x7B8E89b0cE7BAC2cfEC92A371Da899eA8CBdb450',
    investing_address: '0x5adDc89785D75C86aB939E9e15bfBBb7Fc086A87',
    staking_address: '0x8E2c0CbDa6bA7B65dbcA333798A3949B07638026',
    boosting_address: null,
    distributor_address: '0x7F82ff050128e29Fd89D85d01b93246F744E62A0',
    rewards_tokens: ['0x31429d1856ad1377a8a0079410b297e1a9e214c2'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
