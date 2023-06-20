const POOLS = [
  {
    name: 'Pool V2 cAAVE',
    chain: 'ethereum',
    underlying_tokens: ['0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'],
    pool_address: '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c',
    investing_address: '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cBAT',
    chain: 'ethereum',
    underlying_tokens: ['0x0d8775f648430679a709e98d2b0cb6250d2887ef'],
    pool_address: '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
    investing_address: '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cCOMP',
    chain: 'ethereum',
    underlying_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    pool_address: '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4',
    investing_address: '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cDAI',
    chain: 'ethereum',
    underlying_tokens: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    pool_address: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
    investing_address: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cETH',
    chain: 'ethereum',
    underlying_tokens: ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'],
    pool_address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
    investing_address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cLINK',
    chain: 'ethereum',
    underlying_tokens: ['0x514910771af9ca656af840dff83e8264ecf986ca'],
    pool_address: '0xface851a4921ce59e912d19329929ce6da6eb0c7',
    investing_address: '0xface851a4921ce59e912d19329929ce6da6eb0c7',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cMKR',
    chain: 'ethereum',
    underlying_tokens: ['0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'],
    pool_address: '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b',
    investing_address: '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cSUSHI',
    chain: 'ethereum',
    underlying_tokens: ['0x6b3595068778dd592e39a122f4f5a5cf09c90fe2'],
    pool_address: '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7',
    investing_address: '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cTUSD',
    chain: 'ethereum',
    underlying_tokens: ['0x0000000000085d4780b73119b644ae5ecd22b376'],
    pool_address: '0x12392f67bdf24fae0af363c24ac620a2f67dad86',
    investing_address: '0x12392f67bdf24fae0af363c24ac620a2f67dad86',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cUNI',
    chain: 'ethereum',
    underlying_tokens: ['0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'],
    pool_address: '0x35a18000230da775cac24873d00ff85bccded550',
    investing_address: '0x35a18000230da775cac24873d00ff85bccded550',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cUSDC',
    chain: 'ethereum',
    underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
    pool_address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    investing_address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cUSDP',
    chain: 'ethereum',
    underlying_tokens: ['0x8e870d67f660d95d5be530380d0ec0bd388289e1'],
    pool_address: '0x041171993284df560249b57358f931d9eb7b925d',
    investing_address: '0x041171993284df560249b57358f931d9eb7b925d',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cUSDT',
    chain: 'ethereum',
    underlying_tokens: ['0xdac17f958d2ee523a2206206994597c13d831ec7'],
    pool_address: '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9',
    investing_address: '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cWBTC',
    chain: 'ethereum',
    underlying_tokens: ['0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'],
    pool_address: '0xccf4429db6322d5c611ee964527d42e5d685dd6a',
    investing_address: '0xccf4429db6322d5c611ee964527d42e5d685dd6a',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cYFI',
    chain: 'ethereum',
    underlying_tokens: ['0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e'],
    pool_address: '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946',
    investing_address: '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cZRX',
    chain: 'ethereum',
    underlying_tokens: ['0xe41d2489571d322189246dafa5ebde1f4699f498'],
    pool_address: '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407',
    investing_address: '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
    rewards_tokens: ['0xc00e94cb662c3520282e6f5717214004a7f26888'],
    metadata: {},
  },
  {
    name: 'Pool V2 cUSDC',
    chain: 'goerli',
    underlying_tokens: ['0x07865c6E87B9F70255377e024ace6630C1Eaa37F'],
    pool_address: '0x73506770799Eb04befb5AaE4734e58C2C624F493',
    investing_address: '0x73506770799Eb04befb5AaE4734e58C2C624F493',
    staking_address: '',
    boosting_address: null,
    distributor_address: '0x05Df6C772A563FfB37fD3E04C1A279Fb30228621',
    rewards_tokens: ['0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
