const { gql, request } = require('graphql-request')


const chain = {
  // fantom : `/granary-fantom`,
  optimism: `/granary-optimism`,
  ethereum: `/granary-ethereum`,
  // avalanche: `/granary-avalanche`,
};

const baseURL = 'https://api.thegraph.com/subgraphs/name/0xfantommenace'


const poolsQuery = gql`
{
    reserves {
      pool {
        lendingPool
      }
      aToken {
        id
        }
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
`


export async function queryGranaryGraphData (chains) {
  const url = baseURL + chain[chains];
  const granaryMarketStores = await request(url, poolsQuery)
  return granaryMarketStores.reserves
}