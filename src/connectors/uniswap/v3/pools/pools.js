const POOLS = [
  {
    name: 'Pool UNISWAP/USDC',
    chain: 'ethereum',
    underlying_tokens: [
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC - 6 decimals
      '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' // UniswapToken - 18 decimals
    ],
    investing_address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    pool_address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  }
]

/// pools
async function pools () {
  return POOLS
}

module.exports = pools
