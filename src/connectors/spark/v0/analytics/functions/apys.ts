import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ethers } from 'ethers'
import { DataABI } from '../../abi/Data'
import { toNumber } from 'lodash'

async function checkSparkAPYs (chain, underlyingTokenAddress, dataAddress) {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const Data = new ethers.Contract(dataAddress, DataABI, provider)

    const reserveData = await Data.getReserveData(underlyingTokenAddress)
    const apy = (toNumber(reserveData[5]) / 10 ** 27)*100

    return { data: apy, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
export default checkSparkAPYs
