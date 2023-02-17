import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import VaultABI from '../../abi/vault.json'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type NumberedData } from '../../../../../utils/types/fetched-data'

export async function checkYearnOutstandingLoans (
  chain,
  poolAddress
): Promise<NumberedData> {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider
    )

    /// TVL function ///
    const debt = await POOL.totalDebt()

    const decimals = await erc20Decimals(provider, poolAddress)
    const formattedDebt = debt / 10 ** decimals
    return { data: formattedDebt, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
