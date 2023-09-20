import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import { PoolTokenABI } from '../../abi/PoolToken'
import { ethers } from 'ethers'
// import { DataNumberResponse } from 'src/interfaces/response/Internal/DataNumberInterface';
import { getNodeProvider } from '../../../../../utils/getNodeProvider'

export async function checkTruefiV2Liquidity (
  chain: string,
  poolAddress: string
): Promise<any> {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const liquidityBN = await POOL.liquidValue()
    const decimals = await erc20Decimals(provider, poolAddress)
    const liquidity = liquidityBN / 10 ** decimals
    return { data: liquidity, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
