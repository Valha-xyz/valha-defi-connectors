/* eslint-disable @typescript-eslint/no-var-requires */
const POOLS = require('./generatedPools.json');

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;


// {
//   "name": "50WETH-50AURA Aura Vault",
//   "chain": "ethereum",
//   "underlying_tokens": ["0xcfca23ca9ca720b6e98e3eb9b6aa0ffc4a5c08b9"],
//   "pool_address": "0x1204f5060be8b716f5a62b4df4ce32acd01a69f5",
//   "investing_address": "0xb188b1cb84fb0ba13cb9ee1292769f903a9fec59",
//   "staking_address": null,
//   "boosting_address": null,
//   "distributor_address": null,
//   "rewards_tokens": ["0xba100000625a3754423978a60c9317c58a424e3D"],
//   "metadata": {}
// },
