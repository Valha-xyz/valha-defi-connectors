/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import { type Pool } from '../../../../utils/types/connector-types'
import { Chain } from '../../../../utils/types/networks'
import { ethers } from 'ethers'
import { PoolABI } from '../abi/Pool'
import { RewardsABI } from '../abi/Rewards'
import { getNodeProvider } from '../../../../utils/getNodeProvider'
const path = require('path')


const chains = ['bsc']
const unitroller = '0xfD36E2c2a6789Db23113685031d7F16329158384'
const rewards_tokens = '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63'

async function getMarkets (chain) {
  const provider = getNodeProvider(chain)
  const markets = new ethers.Contract(unitroller, RewardsABI, provider)
  return markets.getAllMarkets()
}


async function generatePools (): Promise<Pool | Record<never, never>> {
  const chain = chains[0]
  const pools = await getMarkets(chain)
  const provider = getNodeProvider(chain)

  if (!pools || pools.length === 0) {
    return {}
  }
  const modifiedPools: Promise<Pool>[] = pools.map_async(async (elem): Promise<Pool> => {
    const pool = new ethers.Contract(elem, PoolABI, provider)
    console.log(await pool.underlying())
      return {
        name: await pool.name(),
        chain: chain,
        underlying_tokens: [await pool.underlying()],
        pool_address: elem,
        investing_address: elem,
        staking_address: null,
        boosting_address: null,
        distributor_address: unitroller,
        rewards_tokens: [rewards_tokens],
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
