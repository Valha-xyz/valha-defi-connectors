import GlobalABI from '../../abi/Globals.json'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'

const globalAddress = '0xC234c62c8C09687DFf0d9047e40042cd166F3600'

export async function checkMapleV3Window (
  poolAddress: string,
  userAddress: string
): Promise<any> {
  try {
    // Pool.withdrawCooldown(userRelayerAddress) + lpCooldownPeriod
    const provider = getNodeProvider('ethereum')
    if (!provider) throw new Error('No provider was found.')
    const GLOBALS = new ethers.Contract(globalAddress, GlobalABI, provider)
    const dataGlobals = await GLOBALS.getLpCooldownParams()
    const lpWithdrawWindow = parseInt(dataGlobals[1].toString())
    return { data: lpWithdrawWindow, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
