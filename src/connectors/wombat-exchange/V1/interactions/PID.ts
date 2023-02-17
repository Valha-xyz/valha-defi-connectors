import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../utils/getNodeProvider'
import MasterABI from '../abi/Master.json'

const MasterAddress = '0xE2C07d20AF0Fb50CAE6cDD615CA44AbaAA31F9c8'

export async function getWombatPid (poolAddress) {
  try {
    const provider = await getNodeProvider('bsc')
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(MasterAddress, MasterABI, provider)
    const idBN = await POOL.getAssetPid(poolAddress)
    return idBN.toString()
  } catch (err) {
    console.log(err)
    return null
  }
}
