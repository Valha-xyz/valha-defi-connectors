import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import { VaultABI } from '../../abi/vault'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type NumberedData } from '../../../../../utils/types/fetched-data'
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'

export async function checkAngleTvl (
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

    const underlyingTokenAddress = await POOL.asset();

    /// price

    const { data, err } = await getGeckoTokenPrice(
      chain,
      underlyingTokenAddress
    )
    if (err) throw new Error(err.message)
    const tokenPrice = data

    /// TVL function ///
    const Tvl = await POOL.totalAssets();

    const formattedTvl = tokenPrice * Tvl / 10 ** 18;
    return { data: formattedTvl, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
