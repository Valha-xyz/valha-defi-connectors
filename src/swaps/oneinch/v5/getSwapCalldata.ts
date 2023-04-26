import { BigNumber, type BigNumberish } from 'ethers'
import axios from 'axios'
import { getChainId } from '../../../utils/getChainId'
import { SwapOptions, type GetSwapCalldataFunction } from '../../../utils/types/liquidityProviders'
// DOC is located here : https://docs.1inch.io/docs/aggregation-protocol/api/swagger

const oneInchAPI = axios.create({
  baseURL: 'https://api.1inch.io/v5.0/'
})

const ONE_INCH_SLIPPAGE = 10

export const getSwapCalldata: GetSwapCalldataFunction = async (
  chain: string,
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  swapperAddress: string,
  options: SwapOptions
) => {
  const chainId = getChainId(chain)
  if (!chainId) {
    throw new Error(
      `Swap not supported for this protocol yet, protocol was: ${chain}`
    )
  }
  const swapData = await oneInchAPI
    .get(`${chainId}/swap`, {
      params: {
        fromTokenAddress: tokenIn,
        toTokenAddress: tokenOut,
        amount: amount.toString(),
        fromAddress: swapperAddress,
        slippage: options.slippage ?? ONE_INCH_SLIPPAGE,
        disableEstimate: true,
      }
    })
    .catch((error) => {
      console.log(error)
      return error
    })

  if (!swapData?.data) {
    throw new Error(
      'There was an error while trying to generate the swap tx data for 1inch.'
    )
  }
  return {
    data: swapData?.data.tx.data
  }
}
