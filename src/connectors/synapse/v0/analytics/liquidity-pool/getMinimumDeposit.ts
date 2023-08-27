import { BigNumber, Contract } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'

import {ROUTERABI} from '../../abi/Router'
import { type Pool } from '../../../../../utils/types/connector-types'
import { findTokenPosition } from './getQuotePrice'

export const getMinimumDeposit = async (
  amount1: BigNumber,
  token1: string, // Token OF THE POOL that you will actually enter with
  pool: Pool
): Promise<BigNumber> => {
  const provider = getNodeProvider(pool.chain)

  
  const poolContract = new Contract(pool.investing_address,ROUTERABI,provider)

  const poolSize = pool.underlying_tokens.length
  const amounts = Array.from({ length: poolSize }, (v) => BigNumber.from(0))
  amounts[await findTokenPosition(token1, poolContract)] = amount1


  const test = await poolContract.calc_token_amount(amounts, true, { gasLimit: 1000000 })
  return test
}

