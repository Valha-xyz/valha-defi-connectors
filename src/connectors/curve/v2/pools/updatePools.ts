/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import { type Pool } from '../../../../utils/types/connector-types'
import axios from 'axios'
const path = require('path')

const CRV_TOKEN = {
  ethereum: '0xd533a949740bb3306d119cc777fa900ba034cd52',
  polygon: '0x172370d5cd63279efa6d502dab29171933a610af',
  arbitrum: '0x11cdb42b0eb46d95f990bedd4695a6e3fa034978',
  optimism: '0x0994206dfe8de6ec6920ff4d779b0d950605fb53',
  avalanche: '0x47536f17f4ff30e64a96a7555826b8f9e66ec468'
}

async function getDataChain (chain: string): Promise<Pool[] | null> {
  const types = ['main', 'crypto', 'factory', 'factory-crypto']
  let result = []
  for (const type of types) {
    const URL = `https://api.curve.fi/api/getPools/${chain}/${type}`
    const res = await axios.get(URL)
    if (!res.data.success) { throw new Error('Error while getting data from Curve API') }
    const info = res.data.data.poolData
    result = [...result, ...info]
  }

  if (!result || result.length === 0) {
    return null
  }

  const CRV = CRV_TOKEN[chain]
  const modifiedPools: Pool[] = result
    .filter((pool) => pool.usdTotal > 1_000_000) // Some pools are hidden by the interface
    .map((elem): Pool => {
      console.log(elem)
      if (elem) {
        return {
          name: elem.name ? elem.name : 'Curve.fi Pool',
          chain,
          underlying_tokens: elem.coins.map((coin) => coin.address),
          pool_address: elem.lpTokenAddress
            ? elem.lpTokenAddress.toLowerCase()
            : elem.address.toLowerCase(),
          investing_address: elem.address.toLowerCase(),
          staking_address: elem.gaugeAddress
            ? elem.gaugeAddress.toLowerCase()
            : null,
          boosting_address: null,
          distributor_address: null,
          rewards_tokens: elem.gaugeRewards
            ? [CRV, ...elem.gaugeRewards.map((coin) => coin.gaugeAddress)]
            : [],
          metadata: {
            id: elem.id
          }
        }
      }
    })

  return modifiedPools
}

async function generatePools (): Promise<Pool | Record<never, never>> {
  let result = []
  const CHAINS = ['ethereum', 'polygon', 'arbitrum', 'optimism', 'avalanche']
  for (const chain of CHAINS) {
    const pools = await getDataChain(chain)
    result = [...result, ...pools]
  }
  return result
}

async function updatePools () {
  const pools = await generatePools()
  const strPools = JSON.stringify(pools, null, 4)
  const relativePath = path.join(__dirname, '/generatedPools.json')
  fs.writeFileSync(relativePath, strPools)
}

updatePools()
