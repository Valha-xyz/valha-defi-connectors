import pMap from 'p-map';
import { gql, request } from 'graphql-request';
const path = require('path');
import fs from 'fs';

const SUBGRAPH_URLS = {
  ethereum:
    'https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-mainnet',
  optimism:
    'https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-optimism',
  polygon:
    'https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-polygon',
  arbitrum:
    'https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-arbitrum',
};

function poolsQuery() {
  return gql`
    {
      vaults {
        id
        token0 {
          name
          symbol
          address
          decimals
        }
        token1 {
          name
          symbol
          address
          decimals
        }
      }
    }
  `;
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Router = {
  ethereum: '0xdd92062adf9f6edf528babe7f04804fe86424a74',
  optimism: '0x9ce88a56d120300061593ef7ad074a1b710094d5',
  polygon: '0xc73fb100a995b33f9fa181d420f4c8d74506df66',
  arbitrum: '0x2845c6929d621e32b7596520c8a1e5a37e616f09',
};

async function getPools(chain) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const pools = await request(SUBGRAPH_URL, poolsQuery());

    // We create the pools object
    const formattedPools = pools.vaults.map((pool) => {
      return {
        name: `${pool.token0.name} - ${pool.token1.name} LP`,
        chain: chain,
        underlying_tokens: [pool.token0.address, pool.token1.address],
        pool_address: pool.id,
        investing_address: Router[chain],
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: null,
        metadata: {},
      };
    });
    console.log(formattedPools.length);
    return formattedPools;
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

async function generatePools() {
  let result = [];
  const CHAINS = ['optimism', 'ethereum', 'polygon', 'arbitrum'];
  for (const chain of CHAINS) {
    const pools = await getPools(chain);
    result = [...result, ...pools];
  }

  return result;
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, '/generatedPools.json');
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
