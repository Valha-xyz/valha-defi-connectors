import pMap from 'p-map';
import { gql, request } from 'graphql-request';
const path = require('path');
import fs from 'fs';

export const SUBGRAPH_URLS = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
  polygon:
    'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
  arbitrum:
    'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2',
};

export const GAUGE_URLS = {
  ethereum:
    'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
  polygon:
    'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-polygon',
  arbitrum:
    'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-arbitrum',
};

function poolsQuery() {
  //filter pools on type = 2 and remove aave boosted pools and bb-a ones.

  // let lastIdCondition = `where: { id_gt: "${last_id}" , totalLiquidity_gt: "500000", strategyType: 2 }`;
  // if (last_id == undefined) {
  //   lastIdCondition = '';
  // }

  return gql`
    query Query {
      pools(first: 1000, where: { totalLiquidity_gt: 500000 }) {
        id
        address
        name
        poolType
        tokensList
        strategyType
        tokens {
          address
          balance
          symbol
          weight
        }
      }
    }
  `;
}

function poolsGauge() {
  return gql`
    query Query {
      liquidityGauges(first: 1000) {
        id
        symbol
        pool {
          id
        }
        rewardTokensList
      }
    }
  `;
}

function getRewardTokensForPool(poolId, gauges) {
  for (const gauge of gauges.liquidityGauges) {
    console.log(gauge);
    if (gauge && gauge.pool && gauge.pool.id === poolId) {
      return gauge.rewardTokensList;
    }
  }
  return null; // Return null if pool id not found
}

// This is the general interaction address (true for all pools). It handles all liquidity providing/collecting/retrieving
const Router = {
  ethereum: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  arbitrum: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  polygon: '0xba12222222228d8ba445958a75a0704d566bf2c8',
};

async function getDataChain(chain) {
  try {
    const pools = await request(SUBGRAPH_URLS[chain], poolsQuery());

    //we create the gauge objects
    const stakingPoolsData = await request(GAUGE_URLS[chain], poolsGauge());
    const stakingPools = stakingPoolsData.liquidityGauges;
    const STAKING_POOLS = {};
    for (const info of stakingPools) {
      if (info && info.pool) {
        STAKING_POOLS[info.pool.id.toLowerCase()] = info.id.toLowerCase();
      }
    }

    // return [];
    // We create the pools object
    const formattedPools = pools.pools.map((pool) => {
      return {
        name: 'Balancer - ' + pool.name,
        chain: chain,
        underlying_tokens: pool.tokensList
          .map((token) => {
            if (token.toLowerCase() !== pool.address.toLowerCase()) {
              return token.toLowerCase();
            }
          })
          .filter((elem) => elem?.length > 0),
        pool_address: pool.address.toLowerCase(),
        investing_address: Router[chain].toLowerCase(),
        staking_address: STAKING_POOLS[pool.address.toLowerCase()],
        boosting_address: null,
        distributor_address: STAKING_POOLS[pool.address.toLowerCase()],
        rewards_tokens: getRewardTokensForPool(pool.address, stakingPoolsData),
        metadata: {
          pool_id: pool.id,
          pool_tokens: pool.tokensList,
        },
      };
    });
    console.log(formattedPools.length);
    return formattedPools;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function generatePools() {
  let result = [];
  const CHAINS = ['ethereum', 'polygon', 'arbitrum'];
  for (const chain of CHAINS) {
    const pools = await getDataChain(chain);
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
