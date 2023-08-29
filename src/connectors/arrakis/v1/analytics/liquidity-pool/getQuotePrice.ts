import { type BigNumber, type BigNumberish, Contract } from 'ethers'
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type Pool } from '../../../../../utils/types/connector-types'
import { POOLABI } from '../../abi/POOLABI'


export async function GetQuotePriceFunction(
  amount1: BigNumber,
  amount2: BigNumber,
  chain: string,
  pool: Pool,
): Promise<BigNumber> {
  if (chain != 'ethereum') {
    throw 'Uniswap v2 not available outside of ethereum'
  }

  const provider = getNodeProvider(chain)
  const poolContract = new Contract(
    pool.pool_address,
    POOLABI,
    provider
  )


  const amounts = await poolContract.getMintAmounts(amount1, amount2)

  return amounts.mintAmount
}


