const POOLS = require('./generatedPools.json');


/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;

// [
//   {
//     name: 'Flux USDC',
//     chain: 'ethereum',
//     underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
//     pool_address: '0x465a5a630482f3abd6d3b84b39b29b07214d19e5',
//     investing_address: '0x465a5a630482f3abd6d3b84b39b29b07214d19e5',
//     staking_address: '',
//     boosting_address: null,
//     distributor_address: '',
//     rewards_tokens: [''],
//     metadata: {},
//   },
//   {
//     name: 'Flux DAI',
//     chain: 'ethereum',
//     underlying_tokens: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
//     pool_address: '0xe2ba8693ce7474900a045757fe0efca900f6530b',
//     investing_address: '0xe2ba8693ce7474900a045757fe0efca900f6530b',
//     staking_address: '',
//     boosting_address: null,
//     distributor_address: '',
//     rewards_tokens: [''],
//     metadata: {},
//   },
//   {
//     name: 'Flux FRAX',
//     chain: 'ethereum',
//     underlying_tokens: ['0x853d955acef822db058eb8505911ed77f175b99e'],
//     pool_address: '0x1C9A2d6b33B4826757273D47ebEe0e2DddcD978B',
//     investing_address: '0x1C9A2d6b33B4826757273D47ebEe0e2DddcD978B',
//     staking_address: '',
//     boosting_address: null,
//     distributor_address: '',
//     rewards_tokens: [''],
//     metadata: {},
//   },
//   {
//     name: 'Flux USDT',
//     chain: 'ethereum',
//     underlying_tokens: ['0xdac17f958d2ee523a2206206994597c13d831ec7'],
//     pool_address: '0x81994b9607e06ab3d5cF3AffF9a67374f05F27d7',
//     investing_address: '0x81994b9607e06ab3d5cF3AffF9a67374f05F27d7',
//     staking_address: '',
//     boosting_address: null,
//     distributor_address: '',
//     rewards_tokens: [''],
//     metadata: {},
//   },
// ];