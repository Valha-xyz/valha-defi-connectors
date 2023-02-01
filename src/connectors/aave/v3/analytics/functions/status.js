/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider')
const ethers = require('ethers')
const ATokenABI = require('../../abi/AToken.json')
const { getGeckoTokenPrice } = require('src/utils/prices/getGeckoTokenPrice')

async function checkAaveV3TVL (chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const AToken = new ethers.Contract(poolAddress, ATokenABI, provider)
    const underlyingTokenAddress = await AToken.UNDERLYING_ASSET_ADDRESS()
    const { data, err } = await getGeckoTokenPrice(
      chain,
      underlyingTokenAddress
    )
    if (err) throw new Error(err.message)
    const tokenPrice = data
    const totalSupplyBN = await AToken.totalSupply()
    const decimals = await AToken.decimals()
    const totalSupply = totalSupplyBN / 10 ** decimals
    const TVL = totalSupply * tokenPrice
    return { data: TVL, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = checkAaveV3TVL
