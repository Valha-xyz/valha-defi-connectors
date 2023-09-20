import { erc20Decimals } from '../../../../../utils/ERC20Decimals'
import { VaultABI } from '../../abi/beefy_vault'
import { ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { fetchLps, fetchTokenPrices } from '../external/beefy.api'

export async function checkBeefyVaultPrice (chain, poolInfo) {
  try {
    let allPrices
    if (poolInfo.oracle == 'lps') {
      allPrices = await fetchLps()
    } else if (poolInfo.oracle == 'tokens') {
      allPrices = await fetchTokenPrices()
    } else {
      allPrices = []
    }

    const price = allPrices[poolInfo.oracleId]

    return { data: price, err: null }
  } catch (err) {
    return { data: null, err }
  }
}
