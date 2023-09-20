// import pMap from "p-map"
const pMap = require('p-map');
const { request, gql } = require('graphql-request');
const path = require('path');
const fs = require('fs');

const SUBGRAPH_URLS = {
  bsc: 'https://api.thegraph.com/subgraphs/name/wombat-exchange/wombat-exchange-bsc',
  arbitrum:
    'https://api.thegraph.com/subgraphs/name/wombat-exchange/wombat-exchange-arbone',
};

const WOM_ADDRESS = {
  bsc: '0xAD6742A35fB341A9Cc6ad674738Dd8da98b94Fb1',
  arbitrum: '0x7b5eb3940021ec0e8e463d5dbb4b7b09a89ddf96',
};

const investing_address = {
  bsc: '0x312bc7eaaf93f1c60dc5afc115fccde161055fb0',
  arbitrum: '0xc6bc781E20f9323012F6e422bdf552Ff06bA6CD1',
};

const staking_address = {
  bsc: '0x489833311676B566f888119c29bd997Dc6C95830',
  arbitrum: '0x62A83C6791A3d7950D823BB71a38e47252b6b6F4',
};

function poolsQuery() {
  return gql`
    {
      assets(where: { id_not: "0x0000000000000000000000000000000000000000" }) {
        id
        name
        poolAddress
        underlyingToken {
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
    const formattedPools = pools.assets.map((pool) => {
      return {
        name: pool.name,
        chain: chain,
        underlying_tokens: [pool.underlyingToken.id],
        pool_address: pool.id,
        investing_address: investing_address[chain],
        staking_address: staking_address[chain],
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: [WOM_ADDRESS[chain]],
        metadata: {},
      };
    });
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
