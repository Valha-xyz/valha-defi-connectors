/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider')
const ethers = require('ethers')
const PoolTokenABI = require('../../abi/Pool.json')
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals')

async function checkRibbonV1TVL (chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const TvlBN = await POOL.poolSize()
    const decimals = await erc20Decimals(provider, poolAddress)
    const TVL = TvlBN / 10 ** decimals
    return { data: TVL, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = checkRibbonV1TVL
