// import pMap from "p-map"
const pMap = require('p-map');
const { request, gql } = require('graphql-request');
const path = require('path');
const fs = require('fs');

const staking_address = '0xa625ab01b08ce023b2a342dbb12a16f2c8489a8f';

const SUBGRAPH_URLS = {
  bsc: 'https://api.thegraph.com/subgraphs/name/messari/alpaca-finance-lending-bsc',
};
function poolsQuery() {
  return gql`
    {
      markets {
        id
        name
        rewardTokens {
          token {
            id
          }
        }
        inputToken {
          id
        }
      }
    }
  `;
}

async function getPools(chain) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const pools = await request(SUBGRAPH_URL, poolsQuery());

    // We create the pools object
    const formattedPools = pools.markets.map((pool) => {
      return {
        name: pool.name,
        chain: chain,
        underlying_tokens: [pool.inputToken.id],
        pool_address: pool.id,
        investing_address: pool.id,
        staking_address: staking_address,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: [pool.rewardTokens[1].token.id],
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

async function getAllPools(chain) {
  let allPools = [];
  let newPools = [];
  newPools = await getPools(chain);
  allPools = allPools.concat(newPools);
  return allPools;
}

async function generatePools() {
  const allPools = await pMap(Object.keys(SUBGRAPH_URLS), async (chain) =>
    getAllPools(chain)
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
