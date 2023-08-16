/* eslint-disable @typescript-eslint/no-var-requires */
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ethers } from 'ethers'
// import { ATokenABI } from '../../abi/Rewards'
import { InvestingABI } from '../../abi/Investing'
import { PoolABI } from '../../abi/Pool'


const INVESTING = {
  celo: '0x970b12522CA9b4054807a2c5B736149a5BE6f670'
}



async function checkMoolaAPYs (chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const AToken = new ethers.Contract(poolAddress, PoolABI, provider)
    const underlyingTokenAddress = await AToken.UNDERLYING_ASSET_ADDRESS()

    const POOL = new ethers.Contract(
      INVESTING[chain],
      InvestingABI,
      provider
    )
    const ReserveData = await POOL.getReserveData(underlyingTokenAddress)
    const activity_apy = ReserveData[3] / 1e25
    

    // Rewards APY

    // const APY_URL = APY_URLS[chain]
    const reward_apy = 0 // getAPYByTokenAddress(poolAddress, APY_URL)

    return { data: { activity_apy, reward_apy }, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

export default checkMoolaAPYs