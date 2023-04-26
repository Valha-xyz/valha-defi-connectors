import { BigNumber, type BigNumberish } from 'ethers'
import axios from 'axios'
import { getChainId } from '../../../utils/getChainId'
import { SwapOptions, type GetSwapCalldataFunction } from '../../../utils/types/liquidityProviders'
// DOC is located here : https://www.okx.com/id/web3-docs/dex/dex_api

const  okxInchAPI = axios.create({
  baseURL: 'https://www.okx.com/api/v5/dex/aggregator'
})

const OKX_SLIPPAGE = 0.1 // 10%

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
  const swapData = await okxInchAPI
    .get(`swap`, {
      params: {
        chainId,
        amount: amount.toString(),
        fromTokenAddress: tokenIn,
        toTokenAddress: tokenOut,
        userWalletAddress: swapperAddress,
        slippage: options?.slippage ?? OKX_SLIPPAGE,
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
  if(swapData.data.msg && swapData.data.data.length == 0){
    throw swapData.data.msg
  }
  console.log(swapData.data.data[0].tx.to)
  return {
    data: swapData.data.data[0].tx.data
  }
}
