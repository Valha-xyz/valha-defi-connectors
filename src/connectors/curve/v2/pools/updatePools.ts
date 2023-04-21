/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import { type Pool } from '../../../../utils/types/connector-types'
import axios from 'axios'
const path = require('path')
import PQueue from 'p-queue'; // For getting the ABIs
import pMap from 'p-map'; // For getting the ABIs

require('dotenv').config();


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
    if (!res.data.success) {
      throw new Error('Error while getting data from Curve API')
    }
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

  // Now we will look for their respective ABI (for all pools, this might take long)
    console.log("Pools fetched, now the ABI")
    console.log("Now the ABI")

  const queue = new PQueue({intervalCap: 5, interval: 1500, carryoverConcurrencyCount: true}); // We limit to 5 calls per 1 seconds for the etherscan API
  const poolWithABI = await pMap(modifiedPools, async (pool)=>{
    if(pool.chain == "ethereum"){
      // We look for the abi in that case
      const abi = await queue.add(() => axios.get(`https://api.etherscan.io/api`, {params: {
        module:"contract",
        action:"getabi",
        address: pool.pool_address,
        apikey:process.env.ETHERSCAN_API_KEY
      }}));
      if(abi.data && abi.data.status == "1"){
        console.log(queue.size, " abi calls left")
        return {
          ...pool,
          metadata: {
            ...pool.metadata,
            abi: abi.data.result
          }
        }
      }else{
        console.log("Error for ", pool.pool_address, abi.data)
        return pool
      }
    }else{
      return pool
    }
  })

  return poolWithABI
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
