const POOLS = [
    {
      name: 'Pool USDC',
      chain: 'arbitrum',
      underlying_tokens: ['0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'],
      pool_address: '0x0ddb1ea478f8ef0e22c7706d2903a41e94b1299b',
      investing_address: '0x0ddb1ea478f8ef0e22c7706d2903a41e94b1299b',
      staking_address: null,
      boosting_address: null,
      distributor_address: null,
      rewards_tokens: null,
      metadata: {},
    },
    {
        name: 'Pool USDT',
        chain: 'arbitrum',
        underlying_tokens: ['0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'],
        pool_address: '0x4c8e1656e042a206eef7e8fcff99bac667e4623e',
        investing_address: '0x4c8e1656e042a206eef7e8fcff99bac667e4623e',
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: null,
        metadata: {},
      },
    {
        name: 'Pool ETH',
        chain: 'arbitrum',
        underlying_tokens: ['0x82af49447d8a07e3bd95bd0d56f35241523fbab1'],
        pool_address: '0xb190214d5ebac7755899f2d96e519aa7a5776bec',
        investing_address: '0xb190214d5ebac7755899f2d96e519aa7a5776bec',
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: null,
        metadata: {},
      },
      {
        name: 'Pool FRAX',
        chain: 'arbitrum',
        underlying_tokens: ['0x17fc002b466eec40dae837fc4be5c67993ddbd6f'],
        pool_address: '0x2e9963ae673a885b6bfeda2f80132ce28b784c40',
        investing_address: '0x2e9963ae673a885b6bfeda2f80132ce28b784c40',
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: null,
        metadata: {},
      },
      {
        name: 'Pool ARB',
        chain: 'arbitrum',
        underlying_tokens: ['0x912ce59144191c1204e64559fe8253a0e49e6548'],
        pool_address: '0x21202227bc15276e40d53889bc83e59c3cccc121',
        investing_address: '0x21202227bc15276e40d53889bc83e59c3cccc121',
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: null,
        metadata: {},
      },
  ];
  
  /// pools
  async function pools() {
    return POOLS;
  }
  
  module.exports = pools;