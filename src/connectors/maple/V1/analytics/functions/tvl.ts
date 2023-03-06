import PoolTokenABI from '../../abi/PoolToken.json'
import { ethers } from 'ethers'
import { DIGITAL_USD } from '../../../../../utils/CONST/DIGITAL_USD'
import { getUSDETH } from '../../../../../utils/prices/getUSDETH'
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider'

export async function checkMapleV3TVL (
  chain: string,
  poolAddress: string,
  tokenAddress: string
): Promise<any> {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const TvlBN = await POOL.totalSupply()
    const decimals = 18
    let TVL = TvlBN / 10 ** decimals
    if (!DIGITAL_USD.includes(tokenAddress.toLowerCase())) {
      const { data, err } = await getUSDETH()
      if (err) throw new Error(err.message)
      const exchangePrice = data
      TVL = TVL * exchangePrice
    }
    return { data: TVL, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
