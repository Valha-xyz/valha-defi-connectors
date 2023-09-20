/* eslint-disable @typescript-eslint/no-var-requires */
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ethers } from 'ethers'
// import { ATokenABI } from '../../abi/Rewards'
import { InvestingABI } from '../../abi/Investing'
import { PoolABI } from '../../abi/Pool'


// const APY_URLS = {
//   bsc: '',
//   arbitrum: 'https://newapi4.radiant.capital/42161.json'
// }

const INVESTING = {
  bsc: '0xd50Cf00b6e600Dd036Ba8eF475677d816d6c4281',
  arbitrum: '0xf4b1486dd74d07706052a33d31d7c0aafd0659e1'
}

// async function getAPYByTokenAddress(tokenAddress, APY_URL) {
//   try {
//   const jsonData = await JSON.parse(APY_URL);
//   const poolAPRs = jsonData.lendingPoolRewards.data.poolAPRs
//   const pool = poolAPRs.find(pool => pool.tokenAddress === tokenAddress);
//   return pool ? pool.apy : null;
// } catch (err) {
//   console.log(err)
//   return { data: null, err }
// }
// }


async function checkRadiantAPYs (chain, poolAddress) {
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

export default checkRadiantAPYs