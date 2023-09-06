
/* eslint-disable @typescript-eslint/no-var-requires */
const POOLS = require('./generatedPools.json');


/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;



// const POOLS = [
//   {
//     name: 'USDT Bridge',
//     chain: 'arbitrum',
//     underlying_tokens: ['0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'],
//     pool_address: '0xb6cfcf89a7b22988bfc96632ac2a9d6dab60d641',
//     investing_address: '0x53bf833a5d6c4dda888f69c22c88c9f356a41614',
//     staking_address: '0xea8dfee1898a7e0a59f7527f076106d7e44c2176',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x6694340fc020c5e6b96567843da2df01b2ce1eb6'],
//     metadata: {},
//   },
//   {
//     name: 'USDC Bridge',
//     chain: 'arbitrum',
//     underlying_tokens: ['0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'],
//     pool_address: '0x892785f33cdee22a30aef750f285e18c18040c3e',
//     investing_address: '0x53bf833a5d6c4dda888f69c22c88c9f356a41614',
//     staking_address: '0xea8dfee1898a7e0a59f7527f076106d7e44c2176',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x6694340fc020c5e6b96567843da2df01b2ce1eb6'],
//     metadata: {},
//   },
//   {
//     name: 'USDC Bridge',
//     chain: 'optimism',
//     underlying_tokens: ['0x7f5c764cbc14f9669b88837ca1490cca17c31607'],
//     pool_address: '0xdecc0c09c3b5f6e92ef4184125d5648a66e35298',
//     investing_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     staking_address: '0x4dea9e918c6289a52cd469cac652727b7b412cd2',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x4200000000000000000000000000000000000042'],
//     metadata: {},
//   },
//   {
//     name: 'DAI Bridge',
//     chain: 'optimism',
//     underlying_tokens: ['0xda10009cbd5d07dd0cecc66161fc93d7c9000da1'],
//     pool_address: '0x165137624f1f692e69659f944bf69de02874ee27',
//     investing_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     staking_address: '0x4dea9e918c6289a52cd469cac652727b7b412cd2',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x4200000000000000000000000000000000000042'],
//     metadata: {},
//   },
//   {
//     name: 'FRAX Bridge',
//     chain: 'optimism',
//     underlying_tokens: ['0x2e3d870790dc77a83dd1d18184acc7439a53f475'],
//     pool_address: '0x368605d9c6243a80903b9e326f1cddde088b8924',
//     investing_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     staking_address: '0x4dea9e918c6289a52cd469cac652727b7b412cd2',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x4200000000000000000000000000000000000042'],
//     metadata: {},
//   },
//   {
//     name: 'sUSD Bridge',
//     chain: 'optimism',
//     underlying_tokens: ['0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9'],
//     pool_address: '0x2f8bc9081c7fcfec25b9f41a50d97eaa592058ae',
//     investing_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     staking_address: '0x4dea9e918c6289a52cd469cac652727b7b412cd2',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x4200000000000000000000000000000000000042'],
//     metadata: {},
//   },
//   {
//     name: 'LUSD Bridge',
//     chain: 'optimism',
//     underlying_tokens: ['0xc40f949f8a4e094d1b49a23ea9241d289b7b2819'],
//     pool_address: '0x3533f5e279bdbf550272a199a223da798d9eff78',
//     investing_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     staking_address: '0x4dea9e918c6289a52cd469cac652727b7b412cd2',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x4200000000000000000000000000000000000042'],
//     metadata: {},
//   },
//   {
//     name: 'MAI Bridge',
//     chain: 'optimism',
//     underlying_tokens: ['0xdfa46478f9e5ea86d57387849598dbfb2e964b02'],
//     pool_address: '0x5421fa1a48f9ff81e4580557e86c7c0d24c18036',
//     investing_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     staking_address: '0x4dea9e918c6289a52cd469cac652727b7b412cd2',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x4200000000000000000000000000000000000042'],
//     metadata: {},
//   },
//   // {
//   //   name: 'USDC Bridge',
//   //   chain: 'fantom',
//   //   underlying_tokens: ['0x04068da6c83afcfa0e13ba15a6696662335d5b75'],
//   //   pool_address: '0x12edea9cd262006cc3c4e77c90d2cd2dd4b1eb97',
//   //   investing_address: null,
//   //   staking_address: null,
//   //   boosting_address: null,
//   //   distributor_address: null,
//   //   rewards_tokens: null,
//   //   metadata: {},
//   // },
//   {
//     name: 'USDC Bridge',
//     chain: 'polygon',
//     underlying_tokens: ['0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
//     pool_address: '0x1205f31718499dbf1fca446663b532ef87481fe1',
//     investing_address: '0x45a01e4e04f14f7a4a6702c74187c5f6222033cd',
//     staking_address: '0x8731d54e9d02c286767d56ac03e8037c07e01e98',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590'],
//     metadata: {},
//   },
//   {
//     name: 'USDT Bridge',
//     chain: 'polygon',
//     underlying_tokens: ['0xc2132d05d31c914a87c6611c10748aeb04b58e8f'],
//     pool_address: '0x29e38769f23701a2e4a8ef0492e19da4604be62c',
//     investing_address: '0x45a01e4e04f14f7a4a6702c74187c5f6222033cd',
//     staking_address: '0x8731d54e9d02c286767d56ac03e8037c07e01e98',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590'],
//     metadata: {},
//   },
//   {
//     name: 'USDC Bridge',
//     chain: 'avalanche',
//     underlying_tokens: ['0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e'],
//     pool_address: '0x1205f31718499dbf1fca446663b532ef87481fe1',
//     investing_address: null,
//     staking_address: null,
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590'],
//     metadata: {},
//   },
//   {
//     name: 'USDT Bridge',
//     chain: 'avalanche',
//     underlying_tokens: ['0xc7198437980c041c805a1edcba50c1ce5db95118'],
//     pool_address: '0x29e38769f23701a2e4a8ef0492e19da4604be62c',
//     investing_address: null,
//     staking_address: null,
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590'],
//     metadata: {},
//   },
//   {
//     name: 'USDC Bridge',
//     chain: 'ethereum',
//     underlying_tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
//     pool_address: '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56',
//     investing_address: '0x8731d54e9d02c286767d56ac03e8037c07e01e98',
//     staking_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6'],
//     metadata: {},
//   },
//   {
//     name: 'USDT Bridge',
//     chain: 'ethereum',
//     underlying_tokens: ['0xdac17f958d2ee523a2206206994597c13d831ec7'],
//     pool_address: '0x38ea452219524bb87e18de1c24d3bb59510bd783',
//     investing_address: '0x8731d54e9d02c286767d56ac03e8037c07e01e98',
//     staking_address: '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6'],
//     metadata: {},
//   },
//   {
//     name: 'BUSD Bridge',
//     chain: 'bsc',
//     underlying_tokens: ['0xe9e7cea3dedca5984780bafc599bd69add087d56'],
//     pool_address: '0x98a5737749490856b401db5dc27f522fc314a4e1',
//     investing_address: '0x4a364f8c717caad9a442737eb7b8a55cc6cf18d8',
//     staking_address: '0x3052a0f6ab15b4ae1df39962d5ddefaca86dab47',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0xb0d502e938ed5f4df2e681fe6e419ff29631d62b'],
//     metadata: {},
//   },
//   {
//     name: 'USDT Bridge',
//     chain: 'bsc',
//     underlying_tokens: ['0x55d398326f99059ff775485246999027b3197955'],
//     pool_address: '0x9aa83081aa06af7208dcc7a4cb72c94d057d2cda',
//     investing_address: '0x4a364f8c717caad9a442737eb7b8a55cc6cf18d8',
//     staking_address: '0x3052a0f6ab15b4ae1df39962d5ddefaca86dab47',
//     boosting_address: null,
//     distributor_address: null,
//     rewards_tokens: ['0xb0d502e938ed5f4df2e681fe6e419ff29631d62b'],
//     metadata: {},
//   },
// ];