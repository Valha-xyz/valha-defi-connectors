import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import PoolTokenABI from '../../abi/PoolToken.json'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'

export async function checkMapleV3Outloans (
  chain: string,
  poolAddress: string,
  tokenAddress: string
): Promise<any> {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const OutloansBN = await POOL.principalOut()
    const decimals = await erc20Decimals(provider, tokenAddress)
    const outloans = OutloansBN / 10 ** decimals
    return { data: outloans, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
