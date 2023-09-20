import { BigNumber, type BigNumberish } from 'ethers';
import { config } from 'dotenv';
config();
import axios from 'axios';
import { type GetQuotePriceFunction } from '../../../utils/types/quotePrice';

// DOC is located here : https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote
export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string,
): Promise<BigNumber> => {
  const headers = { '0x-api-key': `${process.env.MAIN_0X_KEY}` };
  const zeroXChain = chain == 'ethereum' ? '' : `${chain}.`;

  const zeroXAPI = axios.create({
    baseURL: `https://${zeroXChain}api.0x.org/`,
  });
  const quote = await zeroXAPI.get('/swap/v1/quote', {
    params: {
      sellToken: tokenIn,
      buyToken: tokenOut,
      sellAmount: amount.toString(),
    },
    headers,
  });

  return BigNumber.from(quote.data.buyAmount);
};
