/* eslint-disable @typescript-eslint/no-var-requires */

const POOLS = [
  {
    name: 'USDT',
    chain: 'bsc',
    pool_address: '0x158da805682bdc8ee32d52833ad41e74bb951e59', // position_tracking
    underlying_tokens: ['0x55d398326f99059ff775485246999027b3197955'],
    investing_address: '0x158da805682bdc8ee32d52833ad41e74bb951e59',
    staking_address: '0xa625ab01b08ce023b2a342dbb12a16f2c8489a8f',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F'],
    metadata: {},
  },
  {
    name: 'TUSD',
    chain: 'bsc',
    pool_address: '0x3282d2a151ca00bfe7ed17aa16e42880248cd3cd', // position_tracking
    underlying_tokens: ['0x14016e85a25aeb13065688cafb43044c2ef86784'],
    investing_address: '0x3282d2a151ca00bfe7ed17aa16e42880248cd3cd',
    staking_address: '0xa625ab01b08ce023b2a342dbb12a16f2c8489a8f',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F'],
    metadata: {},
  },
  {
    name: 'USDC',
    chain: 'bsc',
    pool_address: '0x800933d685e7dc753758ceb77c8bd34abf1e26d7', // position_tracking
    underlying_tokens: ['0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'],
    investing_address: '0x800933d685e7dc753758ceb77c8bd34abf1e26d7',
    staking_address: '0xa625ab01b08ce023b2a342dbb12a16f2c8489a8f',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F'],
    metadata: {},
  },
  {
    name: 'BUSD',
    chain: 'bsc',
    pool_address: '0x7c9e73d4c71dae564d41f78d56439bb4ba87592f', // position_tracking
    underlying_tokens: ['0xe9e7cea3dedca5984780bafc599bd69add087d56'],
    investing_address: '0x7c9e73d4c71dae564d41f78d56439bb4ba87592f',
    staking_address: '0xa625ab01b08ce023b2a342dbb12a16f2c8489a8f',
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: ['0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F'],
    metadata: {},
  },
];

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
