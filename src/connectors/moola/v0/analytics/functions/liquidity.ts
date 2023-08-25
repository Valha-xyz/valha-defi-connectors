/* eslint-disable @typescript-eslint/no-var-requires */
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ethers } from 'ethers'
import { PoolABI } from '../../abi/Pool'
import ERC20ABI from '../../../../../utils/abi/ERC20.json'
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'

async function checkMoolaLiquidity (chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const AToken = new ethers.Contract(poolAddress, PoolABI, provider)
    const underlyingTokenAddress = await AToken.UNDERLYING_ASSET_ADDRESS()
    const { data, err } = await getGeckoTokenPrice(
      chain,
      underlyingTokenAddress
    )
    if (err) {
      throw new Error(`Error while getting the price for ${poolAddress}`)
    }
    const tokenPrice = data
    const Token = new ethers.Contract(
      underlyingTokenAddress,
      ERC20ABI,
      provider
    )
    const decimals = await Token.decimals()
    const totalBalanceBN = await Token.balanceOf(poolAddress)
    const totalBalance = totalBalanceBN / 10 ** decimals
    const liquidityUSD = totalBalance * tokenPrice
    return { data: liquidityUSD, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

export default checkMoolaLiquidity

