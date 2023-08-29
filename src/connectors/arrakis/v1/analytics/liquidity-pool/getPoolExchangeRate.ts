import { type BigNumber, BigNumberish, Contract } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { POOLABI } from '../../abi/POOLABI'
import { type Pool } from '../../../../../utils/types/connector-types'
import { type GetExchangeRateFunction } from '../../../../../utils/types/liquidityProviders'


// We only want to know the exchange rate between two assets.
// The method used in the UNISWAP V2 case is not optimal, because it relies on the amount1 parameter
// In the best case scenario, this function does not need the amount1 parameter and only relies on pool reserves
// This function does not assume token1 != token2
export const getExchangeRate: GetExchangeRateFunction = async (
  amount1: BigNumber,
  token1: string,
  token2: string,
  pool: Pool
): Promise<BigNumber> => {
  const provider = getNodeProvider(pool.chain)
  const poolContract = new Contract(
    pool.pool_address,
    POOLABI,
    provider
  )
  if (token1 == token2) {
    return amount1
  }

  const underlyingBalances= await poolContract.getUnderlyingBalances()

  return amount1.mul(underlyingBalances.amount1Current).div(underlyingBalances.amount0Current)
}
