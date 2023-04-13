const { gql, request } = require('graphql-request')

export const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/morpho-labs/morphocompoundmainnet'



const poolsQuery = gql`
query GetYieldsData {
  markets(first: 128) {
    address
    p2pIndexCursor
    reserveData {
      borrowPoolIndex
      supplyPoolIndex
      borrowPoolRate
      supplyPoolRate
      supplySpeeds
      borrowSpeeds
      usd
      collateralFactor
    }
    p2pData {
      p2pSupplyIndex
      p2pBorrowIndex
    }
    token {
      address
      decimals
      symbol
    }
    metrics {
      borrowBalanceOnPool
      supplyBalanceOnPool
      borrowBalanceInP2P
      supplyBalanceInP2P
      totalSupplyOnPool
      totalBorrowOnPool
    }
  }
}
`


export async function queryMorphoGraphData () {
  const res  = await request(SUBGRAPH_URL, poolsQuery)
  return res.markets
}