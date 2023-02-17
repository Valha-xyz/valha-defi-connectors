import PoolTokenABI from '../../abi/PoolToken.json'
import { ethers } from 'ethers'
// import { DataBoolResponse } from 'src/interfaces/response/Internal/DataBoolInterface';
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider'

export async function checkTruefiV2Status (
  chain: string,
  poolAddress: string
): Promise<any> {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const Status = await POOL.pauseStatus()
    return { data: !Status, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
