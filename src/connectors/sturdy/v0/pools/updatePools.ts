/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import { type Pool } from '../../../../utils/types/connector-types'
import { Chain } from '../../../../utils/types/networks'
import { ethers } from 'ethers'
import PoolABI from '../abi/Pool.json'
import { getNodeProvider } from '../../../../utils/getNodeProvider'
import axios from 'axios'
const path = require('path')
const pMap = require('p-map')

const chains = ['ethereum']

export async function getVaults (chain) {
  const vaults = await axios.get('https://us-central1-stu-dashboard-a0ba2.cloudfunctions.net/getVaultMonitoring', {
    params: {
      chain
    }
  })
  return vaults.data
}

async function generatePools (): Promise<Pool | Record<never, never>> {
  const pools = (await pMap(chains, async (chain) => {
    const vaults = await getVaults(chain)
    const provider = getNodeProvider(chain)

    return pMap(vaults
      .filter(
		  (pool) => pool.active
      ), // Some pools are hidden by the interface
    async (elem): Promise<Pool> => {
      const pool = new ethers.Contract(elem.address, PoolABI, provider)
		  return {
		    name: `Sturdy Yeal Bearing ${elem.tokens}`,
		    chain,
		    underlying_tokens: [await pool.UNDERLYING_ASSET_ADDRESS()],
		    pool_address: elem.address,
		    investing_address: await pool.POOL(),
		    staking_address: null,
		    boosting_address: null,
		    distributor_address: null,
		    rewards_tokens: [],
		    metadata: {}
		  }
    })
  })).flat()

  return pools
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools, null, 4)
  const relativePath = path.join(__dirname, '/generatedPools.json')
  fs.writeFileSync(relativePath, strPools)
}

updatePools()
