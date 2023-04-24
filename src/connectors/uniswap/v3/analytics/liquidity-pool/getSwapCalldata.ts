import { BigNumber, ethers, type BigNumberish } from 'ethers'
import axios from 'axios'
import { getChainId } from '../../../../../utils/getChainId'
import { SwapOptions, type GetSwapCalldataFunction } from '../../../../../utils/types/liquidityProviders'
import { FEE_AMOUNTS, QUOTER_CONTRACT_ADDRESS } from './getQuotePrice'
import { getNodeProvider } from 'src/utils/getNodeProvider'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'


export const getSwapCalldata: GetSwapCalldataFunction = async (
  chain: string,
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  swapperAddress: string,
  options: SwapOptions
) => {
  const provider = getNodeProvider(chain)
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    provider
  )

  // We need to find the fee amount that suits the swap best
  const quoteAmounts: BigNumber[] = await Promise.all(FEE_AMOUNTS.map(async (fee) => {
    const quote = await quoterContract.callStatic.quoteExactInputSingle(
      tokenIn,
      tokenOut,
      fee,
      amount,
      0
    ).catch(()=> BigNumber.from(0));
    return quote;
  }))

  // We take the index of the maximum value of quoteAmounts
  const bestIndex = quoteAmounts.reduce((indexMax, c, index) => (quoteAmounts[indexMax].gt(c) ? indexMax :  index), 0);


  return {
    data: FEE_AMOUNTS[bestIndex].toString()
  }
}
