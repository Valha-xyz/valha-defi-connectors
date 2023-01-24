const external = require('../analytics/external/DefiLlama/index');
const fs = require('fs');
const path = require('path');

const MASTERCHEFV2 = '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652';
const ROUTERV2 = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
async function generatePools() {
  const pools = await external.apy();
  if (!pools || pools.length === 0) {
    return {};
  }
  const modifiedPools = pools.map((elem) => {
    return {
      name: elem.symbol,
      chain: 'bsc',
      underlying_tokens: elem.underlyingTokens,
      pool_address: elem.pool,
      investing_address: ROUTERV2,
      staking_address: MASTERCHEFV2,
      boosting_address: null,
      distributor_address: null,
      rewards_tokens: elem.rewardTokens,
      metadata: {},
    };
  });
  return modifiedPools;
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools);
  const relativePath = path.join(__dirname, '/generatedPools.js');
  const content = `
  const POOLS = ${strPools};

  module.exports = POOLS;
  `;
  fs.writeFileSync(relativePath, content);
}

updatePools();
