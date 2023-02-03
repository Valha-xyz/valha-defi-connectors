/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider')
const ethers = require('ethers')
const PoolTokenABI = require('../../abi/PoolToken.json')

async function checkClearpoolV1APY (chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const SupplyRate = await POOL.getSupplyRate()
    const apy = (SupplyRate / 1e18) * 365.25 * 24 * 3600 * 100
    return { data: apy, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = checkClearpoolV1APY
