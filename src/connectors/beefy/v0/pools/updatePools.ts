/* eslint-disable @typescript-eslint/no-var-requires */
import { fetchTokens, fetchVaults } from '../analytics/external/beefy.api'
import fs from 'fs'
import { type Pool } from '../../../../utils/types/connector-types'
import { Chain } from '../../../../utils/types/networks'
const path = require('path')
const _ = require('lodash')

function mapDistantChainToLocal (network): Chain {
  switch (network) {
    case 'ethereum':
      return Chain.ethereum
      break
    case 'polygon':
      return Chain.polygon
      break
    case 'bsc':
      return Chain.bsc
      break
    case 'arbitrum':
      return Chain.arbitrum
      break
    case 'optimism':
      return Chain.optimism
      break
    case 'celo':
      return Chain.celo
      break
    case 'avalanche':
      return Chain.avalanche
      break
    default:
      return null
  }
}

async function generatePools (): Promise<Pool | Record<never, never>> {
  const pools = await fetchVaults()

  if (!pools || pools.length === 0) {
    return {}
  }

  // Check all available oracles
  // console.log(_.uniq(pools.map(pool=> pool.oracle)))

  const modifiedPools: Pool[] = _.compact(
    pools
      // Should we filter by pool.status to only keep active ones ? (possible states : [ 'active', 'eol', 'paused' ])
      .filter((pool) => pool)
      .map((elem): Pool | undefined => {
        const network = mapDistantChainToLocal(elem.network)

        if (!network) {
          return undefined
        }
        return {
          name: elem.name,
          chain: network,
          underlying_tokens: [elem.tokenAddress],
          pool_address: elem.earnedTokenAddress,
          investing_address: elem.earnedTokenAddress,
          staking_address: null,
          boosting_address: null,
          distributor_address: null,
          rewards_tokens: null,
          metadata: {}
        }
      })
  )
  return modifiedPools
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools, null, 4)
  const relativePath = path.join(__dirname, '/generatedPools.json')
  fs.writeFileSync(relativePath, strPools)
}

updatePools()
