import { gql, request } from 'graphql-request'

export const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/euler-xyz/euler-mainnet'
const poolsQuery = gql`
  {
    eulerMarketStores {
      id
      markets(first: 1000) {
        id
        eTokenAddress
        name
        totalSupply
        totalBalances
        totalBalancesUsd
        totalBorrowsUsd
        borrowAPY
        supplyAPY
      }
    }
  }
`

// https://docs.euler.finance/developers/subgraph
// totalSupply gets you the number of tokens minted by the protocol
// total Balances will get you the number of underlying tokens deposited in the contract
// totalBalancesUsd is the total deposit of asset into the eToken contract
// totalBorrowsUsd is the total amount of assets borrowed from the contract
// We use supply APY to get the deposit APY
export async function queryEulerGraphData () {
  const { eulerMarketStores } = await request(SUBGRAPH_URL, poolsQuery)
  return eulerMarketStores.find((el) => el.id == 'euler-market-store').markets
}
