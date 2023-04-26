import { BigNumber, type BigNumberish, Contract, ethers } from 'ethers'
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import UniswapV2RouterAbi from './../../abi/uniswapv2-router.json'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'

export const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

export const FEE_AMOUNTS = [
  100,
  500,
  3000,
  10000
]

export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string
): Promise<BigNumber> => {
  const provider = getNodeProvider(chain)
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    provider
  )

  // We need to find the fee amount that suits the swap best
  const quoteAmounts = await Promise.all(FEE_AMOUNTS.map(async (fee) => {
    const quote = await quoterContract.callStatic.quoteExactInputSingle(
      tokenIn,
      tokenOut,
      fee,
      amount,
      0
    ).catch(()=> BigNumber.from(0));
    return quote;
  }))

  // We take the maximum value of quoteAmounts
  return quoteAmounts.reduce((a, i) => (a.gt(i) ? a: i), ethers.constants.Zero);
}