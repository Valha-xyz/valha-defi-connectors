import { type Chain } from '../../../../utils/types/networks'
import { BEEFY_API, fetchVaults } from './external/beefy.api'
import { checkBeefyAPY } from './functions/apy'
import { checkBeefySharePrice } from './functions/sharePrice'
import { checkBeefyVaultPrice } from './functions/sharePriceInUSD'
import { checkBeefyTVL } from './functions/tvl'

async function analytics (chain: Chain, poolAddress: string) {
  const allPoolInfo = await fetchVaults()

  // We get the current pool inside this big array
  const currentPoolInfo = allPoolInfo.find(
    (pool) =>
      pool.earnedTokenAddress.toLowerCase() == poolAddress.toLowerCase()
  )
  const vaultPrice = await checkBeefyVaultPrice(chain, currentPoolInfo)
  const tvl = await checkBeefyTVL(chain, poolAddress)
  const sharePrice = await checkBeefySharePrice(chain, poolAddress)
  const activityApy = await checkBeefyAPY(chain, currentPoolInfo.id)
  const rewardsApy = { data: 0, err: null }
  const totalAPY = activityApy.data + rewardsApy.data

  const result = {
    status: null,
    tvl: tvl.data * vaultPrice.data,
    liquidity: tvl.data * vaultPrice.data,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: activityApy.data ? activityApy.data : 0,
    rewards_apy: rewardsApy.data,
    boosting_apy: null,
    share_price: parseFloat(String(sharePrice.data)) * vaultPrice.data,
    minimum_deposit: null,
    maximum_deposit: null
  }
  return result
}

// analytics(Chain.celo, "0xf68C61E3c2f9C48E53391E1FCd2db1f19998151b")
module.exports = {
  main: analytics,
  url: BEEFY_API
}
