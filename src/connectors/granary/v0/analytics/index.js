// import { erc20Decimals } from '../../../../utils/ERC20Decimals'
// import { getNodeProvider } from '../../../../utils/getNodeProvider'

const { queryGranaryGraphData} = require ('./external/graph_query')
const { Chain } = require('../../../../utils/types/networks')

async function analytics (chain, poolAddress) {

  
  const allPoolInfo = await queryGranaryGraphData(chain)
  
  // We get the current pool inside this big array
  const currentPoolInfo = allPoolInfo.find(
    (pool) => pool.aToken.id.toLowerCase() == poolAddress.toLowerCase()
  )

  console.log(currentPoolInfo);

  const tvlUSD = ((Number(currentPoolInfo.totalDeposits) / (10 ** Number(currentPoolInfo.decimals))) * Number(currentPoolInfo.price.priceInEth))/10 ** 8
  const liquidityUSD = ((Number(currentPoolInfo.availableLiquidity) / (10 ** currentPoolInfo.decimals)) * Number(currentPoolInfo.price.priceInEth))/10 ** 8
  const activityApy = Number(currentPoolInfo.liquidityRate) / 1e25
  const outloansUSD = tvlUSD - liquidityUSD
 

  const result = {
    status: tvlUSD > 10000 ? true: null,
    tvl: tvlUSD,
    liquidity: liquidityUSD,
    outloans: outloansUSD > 0 ? outloansUSD: 0,
    losses: null,
    capacity: null,
    apy: activityApy,
    activity_apy: activityApy,
    rewards_apy: 0,
    boosting_apy: 0,
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null
  }
  console.log(result);
  return result
}

module.exports = {
  main: analytics,
  url: "https://granary.finance/markets"
}
