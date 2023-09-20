/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const URL = 'https://bolide.fi/api/v1/vaults/list';

const CHAIN_MAPPING = {
  56: 'bsc',
  137: 'polygon',
};

async function getDataChain() {
  const { data, err } = await axios.get(URL);
  if (err) throw new Error(err);

  const vaults = data.vaults;

  let result = [];
  for (const vault of vaults) {
    console.log(vault);
    const chain = CHAIN_MAPPING[vault.chainId];
    for (const token of vault.tokens) {
      if (token.address === '0x0000000000000000000000000000000000000000') {
        token.address = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
      }
      const info = {
        name: 'Bolide - ' + token.name,
        chain: chain,
        underlying_tokens: [token.address.toLowerCase()],
        pool_address: vault.address.toLowerCase(),
        investing_address: vault.address.toLowerCase(),
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: [],
        metadata: {},
      };
      console.log(info);
      result = [...result, info];
    }
  }

  return result;
}

async function generatePools() {
  const pools = await getDataChain();
  return pools;
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, '/generatedPools.json');
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
