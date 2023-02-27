import ERC20ABI from './abi/ERC20.json'
import { ethers } from 'ethers'

export async function erc20Decimals (
  provider: ethers.providers.BaseProvider,
  tokenAddress: string
): Promise<number> {
  try {
    const ERC20 = new ethers.Contract(tokenAddress, ERC20ABI, provider)
    const balance = await ERC20.decimals()
    return balance
  } catch (err) {
    console.log(err)
    return 0
  }
}
