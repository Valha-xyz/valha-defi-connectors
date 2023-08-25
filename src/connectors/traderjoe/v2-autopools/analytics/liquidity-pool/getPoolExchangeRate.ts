import { BigNumber, BigNumberish, Contract } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
const { POOLABI } = require('../../abi/POOL');
import { type Pool } from '../../../../../utils/types/connector-types'
import { type GetExchangeRateFunction } from '../../../../../utils/types/liquidityProviders'

// We only want to know the exchange rate between two assets.
// This should return the amount of token2 equivalent to amount1 token1
// In the best case scenario, this function does not need the amount1 parameter and only relies on pool reserves
// This function does not assume token1 != token2
export const getExchangeRate: GetExchangeRateFunction = async (
  amount1: Number,
  token1: string,
  token2: string,
  pool: Pool
): Promise<Number> => {
  const provider = getNodeProvider(pool.chain)
  const liquidityProvidingContract = new Contract(
    pool.investing_address,
    POOLABI,
    provider
  )
  if (token1 == token2) {
    return amount1
  }

  // First we get the reserves
  const officialPrice = await liquidityProvidingContract.getPrice()
  const price =  Number(amount1) * officialPrice
  return price;
}
