import { type BigNumber, type BigNumberish, Contract } from 'ethers'
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ROUTERABI } from '../../abi/ROUTERABI'

const SWAP_ROUTE_CONTRACT = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumber,
  tokenOut: string,
  chain: string
): Promise<BigNumber> => {
  if (chain != 'ethereum') {
    throw 'Uniswap v2 not available outside of ethereum'
  }

  const provider = getNodeProvider(chain)
  const swapRouterContract = new Contract(
    SWAP_ROUTE_CONTRACT,
    ROUTERABI,
    provider
  )


  const underlyingBalances= await swapRouterContract.getUnderlyingBalances()

  return amount.mul(underlyingBalances.amount1Current).div(underlyingBalances.amount0Current)
}


