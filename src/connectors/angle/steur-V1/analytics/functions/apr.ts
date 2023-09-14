import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import { VaultABI } from '../../abi/vault'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type NumberedData } from '../../../../../utils/types/fetched-data'

export async function checkAngleApr (
  chain,
  poolAddress
): Promise<NumberedData> {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider
    )

    /// TVL function ///
    const apr = await POOL.estimatedAPR()

    const decimals = await erc20Decimals(provider, poolAddress)
    const formattedApr = apr / 10 ** decimals
    return { data: formattedApr, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
