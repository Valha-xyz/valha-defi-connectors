const POOLS = [
  {
    name: 'Pool UNISWAP/USDC',
    chain: 'ethereum',
    underlying_tokens: [
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC - 6 decimals
      '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' // UniswapToken - 18 decimals
    ],
    investing_address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    pool_address: '0xEBFb684dD2b01E698ca6c14F10e4f289934a54D6'
  },
  {
     name: 'Pool USDT/USDC',
    chain: 'ethereum',
    underlying_tokens: [
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC - 6 decimals
      '0xdAC17F958D2ee523a2206206994597C13D831ec7' // USDT - 6 decimals
    ],
    investing_address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    pool_address: '0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f'
  }
]

/// pools
async function pools () {
  return POOLS
}

module.exports = pools
