
/* eslint-disable @typescript-eslint/no-var-requires */
const POOLS = require('./generatedPools.json');

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;


/*

const POOLS = [
  {
    name: 'Pool UNISWAP/USDC',
    chain: 'ethereum',
    underlying_tokens: [
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC - 6 decimals
      '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' // UniswapToken - 18 decimals
    ],
    investing_address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    pool_address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
    "staking_address": null,
    "boosting_address": null,
    "distributor_address": null,
    "rewards_tokens": [],
    "metadata": {}
  }
]

*/