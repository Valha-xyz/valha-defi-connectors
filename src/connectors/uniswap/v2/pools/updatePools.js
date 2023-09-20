import pMap from 'p-map';
import { gql, request } from 'graphql-request';
const path = require('path');
import fs from 'fs';

const SUBGRAPH_URLS = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v2-dev',
};
function poolsQuery(last_id) {
  // let lastIdCondition = `where: { reserveUSD_gt: "500000" }`;
  // // if (last_id == undefined) {
  // //   lastIdCondition = '';
  // // }

  return gql`
    query Query {
      pairs(first: 250, orderBy: volumeUSD, orderDirection: desc) {
        id
        token0 {
          id
          name
        }
        token1 {
          id
          name
        }
      }
    }
  `;
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Router = {
  ethereum: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
};

async function getPools(chain, last_id) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const pools = await request(SUBGRAPH_URL, poolsQuery(last_id));

    console.log(pools);
    // We create the pools object
    const formattedPools = pools.pairs.map((pool) => {
      const poolInfo = {
        name: `${pool.token0.name} - ${pool.token1.name} LP`,
        chain: chain,
        underlying_tokens: [pool.token0.id, pool.token1.id],
        pool_address: pool.id,
        investing_address: Router[chain],
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: null,
        metadata: {},
      };
      console.log(poolInfo);
      return poolInfo;
    });
    return formattedPools;
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

async function getAllPools(chain) {
  let lastId;

  const pools = await getPools(chain, lastId);

  return pools;
}

async function generatePools() {
  const allPools = await getAllPools('ethereum');
  return allPools;
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, '/generatedPools.json');
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
