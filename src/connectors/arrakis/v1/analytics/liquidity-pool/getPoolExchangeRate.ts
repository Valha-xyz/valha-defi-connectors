import { type BigNumber, BigNumberish, Contract } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ROUTERABI } from '../../abi/ROUTERABI'
import { type Pool } from '../../../../../utils/types/connector-types'
import { type GetExchangeRateFunction } from '../../../../../utils/types/liquidityProviders'

const ROUTER_CONTRACT = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

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
  const liquidityProvidingContract = new Contract(
    ROUTER_CONTRACT,
    ROUTERABI,
    provider
  )
  if (token1 == token2) {
    return amount1
  }

  const underlyingBalances= await liquidityProvidingContract.getUnderlyingBalances()

  return amount1.mul(underlyingBalances.amount1Current).div(underlyingBalances.amount0Current)
}
