const POOLS = require('./scripts/generatedPools');

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
