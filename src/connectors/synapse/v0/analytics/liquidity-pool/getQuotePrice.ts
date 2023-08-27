import { type BigNumber, type BigNumberish, Contract } from 'ethers'
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import pools from '../../pools/pools.js'
import {ROUTERABI} from '../../abi/Router'
import { type Pool } from '../../../../../utils/types/connector-types'

export async function findPoolContract (
  tokenIn: string,
  tokenOut: string,
  chain: string
): Promise<Pool> {
  const POOLS = await pools()

  const foundPool = POOLS.find(
    (pool) =>
      pool.chain == chain &&
      pool.underlying_tokens.includes(tokenIn) &&
      pool.underlying_tokens.includes(tokenOut)
  )
  if (!foundPool) {
    throw 'Swap pool not found, tokens can be swapped that way on curve'
  }
  return foundPool
}

export async function findTokenPosition (
  token: string,
  poolContract: Contract
) {

  // We check onchain that the index is the right one
  const index = await poolContract.getTokenIndex(token, { gasLimit: 1000000 })
  
  return index
}

export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string
): Promise<BigNumber> => {
  const provider = getNodeProvider(chain)
  const pool = await findPoolContract(tokenIn, tokenOut, chain)
  
  const poolContract = new Contract(pool.investing_address,ROUTERABI,provider)

  return poolContract.calculateSwap(
    await findTokenPosition(tokenIn, poolContract),
    await findTokenPosition(tokenOut,poolContract),
    amount
  )
}

