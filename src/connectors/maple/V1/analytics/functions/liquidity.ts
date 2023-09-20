import { erc20BalanceOf } from '../../../../../utils/ERC20BalanceOf'
import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import PoolTokenABI from '../../abi/PoolToken.json'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'

export async function checkMapleV3Liquidity (
  chain: string,
  poolAddress: string,
  tokenAddress: string
): Promise<any> {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const LiquidityLockerAddress = await POOL.liquidityLocker()
    const liquidityBN = await erc20BalanceOf(
      provider,
      tokenAddress,
      LiquidityLockerAddress
    )
    const decimals = await erc20Decimals(provider, tokenAddress)
    const liquidity = liquidityBN / 10 ** decimals
    return { data: liquidity, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
