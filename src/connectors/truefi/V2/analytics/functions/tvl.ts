import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import { PoolTokenABI } from '../../abi/PoolToken'
import { ethers } from 'ethers'
import { getNodeProvider } from 'src/utils/getNodeProvider'
import { DataNumberResponse } from 'src/utils/types/utils'

export async function checkTruefiV2TVL (
  chain: string,
  poolAddress: string
): Promise<DataNumberResponse> {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const TvlBN = await POOL.poolValue()
    const decimals = await erc20Decimals(provider, poolAddress)
    const TVL = TvlBN / 10 ** decimals
    return { data: TVL, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
