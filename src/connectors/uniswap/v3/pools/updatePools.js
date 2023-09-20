import pMap from 'p-map';
import { gql, request } from 'graphql-request';
const path = require('path');
import fs from 'fs';

const SUBGRAPH_URLS = {
  ethereum: `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3`,
  polygon: `https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon`,
  arbitrum: `https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-dev`,
  optimism: `https://api.thegraph.com/subgraphs/name/kalinbas/uniswap-v3-optimism`,
  // celo: `https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo`,
  avalanche: `https://api.thegraph.com/subgraphs/name/lynnshaoyu/uniswap-v3-avax`,
  bsc: `https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-bsc`,
  // base: 'https://api.studio.thegraph.com/query/48211/uniswap-v3-base/version/latest',
};

function poolsQuery(last_id) {
  // // let lastIdCondition = `where: { id_gt: "${last_id}" , totalValueLockedUSD_gt: "500000" }`;
  // let lastIdCondition = `where: {totalValueLockedUSD_gt: "500000" }`;
  // // if (last_id == undefined) {
  // //   lastIdCondition = '';
  // // }

  return gql`
    query Query {
      pools(first: 1000, where: { totalValueLockedUSD_gt: "1000000" }) {
        id
        token0 {
          id
          name
        }
        token1 {
          id
          name
        }
        feeTier
      }
    }
  `;
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const NFTPositionManager = {
  ethereum: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  optimism: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  arbitrum: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  avalanche: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  polygon: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  celo: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
  bsc: '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613',
  base: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
};

async function getPools(chain, last_id) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const pools = await request(SUBGRAPH_URL, poolsQuery(last_id));

    console.log(pools);
    // We create the pools object
    const formattedPools = pools?.pools.map((pool) => {
      return {
        name: `${pool.token0.name} - ${pool.token1.name} LP`,
        chain: chain,
        underlying_tokens: [pool.token0.id, pool.token1.id],
        pool_address: pool.id,
        investing_address: NFTPositionManager[chain],
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: null,
        metadata: {
          fee: pool.feeTier,
        },
      };
    });
    return formattedPools;
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

async function getAllPools(chain) {
  let lastId;
  const newPools = await getPools(chain, lastId);
  return newPools;
}

async function generatePools() {
  const allPools = await pMap(Object.keys(SUBGRAPH_URLS), async (chain) =>
    getAllPools(chain),
  );
  return allPools.flat();
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, '/generatedPools.json');
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
