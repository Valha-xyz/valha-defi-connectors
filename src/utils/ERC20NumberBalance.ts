import ERC20ABI from './abi/ERC20.json'
import { ethers } from 'ethers'

export async function erc20NumberBalance (
  provider: ethers.providers.BaseProvider,
  tokenAddress: string,
  userAddress: string
): Promise<number> {
  try {
    const ERC20 = new ethers.Contract(tokenAddress, ERC20ABI, provider)
    const balance = await ERC20.balanceOf(userAddress)
    const decimals = await ERC20.decimals()
    return balance / 10 ** decimals
  } catch (err) {
    console.log(err)
    return null
  }
}
