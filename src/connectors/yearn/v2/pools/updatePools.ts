/* eslint-disable @typescript-eslint/no-var-requires */
import { fetchVaults } from '../analytics/external/yearn.api'
import fs from 'fs'
import { type Pool } from '../../../../utils/types/connector-types'
import { Chain } from '../../../../utils/types/networks'
const path = require('path')

async function generatePools (): Promise<Pool | Record<never, never>> {
  const pools = await fetchVaults()

  if (!pools || pools.length === 0) {
    return {}
  }
  const modifiedPools: Pool[] = pools
    .filter(
      (pool) =>
        !pool.details.retired &&
        !pool.hideAlways &&
        pool.endorsed &&
        (!pool.details.depositsDisabled || pool.details.withdrawalsEnabled)
    ) // Some pools are hidden by the interface
    .map((elem): Pool => {
      return {
        name: elem.name,
        chain: Chain.ethereum,
        underlying_tokens: [elem.token.address],
        pool_address: elem.address,
        investing_address: elem.address,
        staking_address: null,
        boosting_address: null,
        distributor_address: null,
        rewards_tokens: [elem.details.rewards],
        metadata: {}
      }
    })
  return modifiedPools
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools, null, 4)
  const relativePath = path.join(__dirname, '/generatedPools.json')
  fs.writeFileSync(relativePath, strPools)
}

updatePools()
