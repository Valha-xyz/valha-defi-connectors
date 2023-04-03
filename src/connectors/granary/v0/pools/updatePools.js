
const fs = require('fs')
const path = require('path')
const { gql, request } = require('graphql-request')

const chain = {
    // fantom: `/granary-fantom`,
    optimism: `/granary-optimism`,
    ethereum: `/granary-ethereum`,
    // avalanche: `/granary-avalanche`,
  };

const chains = ['optimism', 'ethereum'];
  
const baseURL = 'https://api.thegraph.com/subgraphs/name/0xfantommenace';
  
const poolsQuery = gql`
{
    reserves {
      pool {
        lendingPool
      }
      aToken {
        id
        }
      id
      symbol
      decimals
      liquidityRate
      availableLiquidity
      price {
        priceInEth
      }
      isActive
      underlyingAsset
      variableBorrowRate
      baseLTVasCollateral
      totalDeposits
      totalLiquidity
      totalCurrentVariableDebt
    }
  }
`;


async function generatePools (poolsQuery) {
  // initialize an empty array
  let pools = [];


  for (let i = 0; i < chains.length; i++) {
    const element = chains[i];
    const url = baseURL + chain[element]
    const res = await request(url, poolsQuery)

    const tmpPool = res.reserves.map(item => { return { ...item, chain: element}})

    pools = pools.concat(tmpPool);
  }

  // console.log(pools);

  const modifiedPools = pools.map((elem) => {
     return {
      name: elem.symbol,
      chain: elem.chain,
      underlying_tokens: [elem.underlyingAsset],
      pool_address: elem.aToken.id,
      investing_address: elem.pool.lendingPool,
      staking_address: null,
      boosting_address: null,
      distributor_address: null,
      rewards_tokens: null,
      metadata: {}
     }})
  

  console.log(modifiedPools)
     
   
  return modifiedPools
}

async function updatePools () {
  const pools = await generatePools(poolsQuery)
  const strPools = JSON.stringify(pools)
  const relativePath = path.join(__dirname, '/generatedPools.js')
  const content = `
  const POOLS = ${strPools};

  module.exports = POOLS;
  `
  fs.writeFileSync(relativePath, content)
}


updatePools()