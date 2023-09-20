import { type BigNumberish } from 'ethers';
import axios from 'axios';
import { config } from 'dotenv';
config();
import {
  type GetSwapCalldataFunction,
  type SwapOptions,
} from '../../../utils/types/liquidityProviders';
import { REF_SLIPPAGE } from '../../../utils/CONST/SWAP';

const ZERO_X_SLIPPAGE_FACTOR = 100;

// DOC is located here : https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote
export const getSwapCalldata: GetSwapCalldataFunction = async (
  chain: string,
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  swapperAddress: string,
  options: SwapOptions,
) => {
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
      takerAddress: swapperAddress,
      slippagePercentage:
        (options.slippage ?? REF_SLIPPAGE) / ZERO_X_SLIPPAGE_FACTOR,
      skipValidation: true,
    },
    headers,
  });

  return quote.data;
};
