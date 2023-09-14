import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import { VaultABI } from '../../abi/vault'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { totalSupply } from '@defillama/sdk/build/erc20'

export async function checkAngleSharePrice (chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider
    )

    /// TVL function ///
    const totalAssets = await POOL.totalAssets();
    const totalSupply = await POOL.totalSupply();
    const finalPricePerShare = totalAssets/totalSupply;
    return { data: finalPricePerShare, err: null }
  } catch (err) {
    return { data: null, err }
  }
}
