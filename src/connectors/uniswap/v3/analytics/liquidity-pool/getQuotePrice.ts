import { type BigNumber, type BigNumberish, Contract, ethers } from 'ethers'
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import UniswapV2RouterAbi from './../../abi/uniswapv2-router.json'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'

const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

const FEE_AMOUNT_MEDIUM = 3000

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
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    tokenIn,
    tokenOut,
    FEE_AMOUNT_MEDIUM,
    amount,
    0
  )
  return quotedAmountOut
}

/*
getQuotePrice(
  "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
  "1000000000000000000",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  "ethereum"
).then((respons) => console.log(respons.toString()));
*/
