import { type BigNumber, type BigNumberish, Contract } from 'ethers'
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import pools from '../../pools/pools.js'

import RouterABI2 from './../../abi/router2.json'
import RouterABI3 from './../../abi/router3.json'
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
  pool: Pool,
  poolContract: Contract
) {

  const index = pool.underlying_tokens.indexOf(token)
  // We check onchain that the index is the right one
  const onChainAddress = await poolContract.coins(index, { gasLimit: 1000000 })
  if (onChainAddress != token) {
    throw "Swap configuration is bad for curve/v2, the asset index doesn't match the on-chain index"
  }
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
  const size = pool.underlying_tokens.length;
  let abi;
  if (size === 2) {
    abi = RouterABI2;
  } else if (size === 3) {
    abi = RouterABI3;
  } else {
    throw new Error('Error: pool size is not handle.');
  }
  const poolContract = new Contract(
    pool.investing_address,
    abi,
    provider
  )

  return poolContract.get_dy(
    await findTokenPosition(tokenIn, pool, poolContract),
    await findTokenPosition(tokenOut, pool, poolContract),
    amount
  )
}
/*
getQuotePrice(
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  "1000000000000000000",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "ethereum"
).then((respons) => console.log(respons.toString()));
*/
