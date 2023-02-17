import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import VaultABI from '../../abi/beefy_vault.json'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'

export async function checkBeefyTVL (chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider
    )

    /// TVL function ///
    /// This gets the TVL in LP units
    /// We need to get the price in token units
    const tvl = await POOL.balance()

    const decimals = await erc20Decimals(provider, poolAddress)
    const formattedTVL = tvl / 10 ** decimals
    return { data: formattedTVL, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
