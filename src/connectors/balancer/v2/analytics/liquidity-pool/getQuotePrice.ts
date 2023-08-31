import { type BigNumber, type BigNumberish, Contract } from 'ethers'
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ROUTERABI } from '../../abi/ROUTERABI'

export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumber,
  tokenOut: string,
  chain: string
): Promise<BigNumber> => {
  if (chain != 'ethereum') {
    throw 'Uniswap v2 not available outside of ethereum'
  }


  return amount;
}

/*
getQuotePrice(
  "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
  "1000000000000000000",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  "ethereum"
).then((respons) => console.log(respons.toString()));

*/
