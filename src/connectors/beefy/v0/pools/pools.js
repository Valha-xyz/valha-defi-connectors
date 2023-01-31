const POOLS = require("./generatedPools.json");

/// pools
async function pools() {
  return POOLS;
}

module.exports = pools;
