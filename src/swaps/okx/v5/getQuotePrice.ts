import { BigNumber, type BigNumberish } from 'ethers';
import axios from 'axios';
import { getChainId } from '../../../utils/getChainId';
import { type GetQuotePriceFunction } from '../../../utils/types/quotePrice';
// DOC is located here : https://www.okx.com/id/web3-docs/dex/dex_api

const okxAPI = axios.create({
  baseURL: 'https://www.okx.com/api/v5/dex/aggregator',
});

export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string
): Promise<BigNumber> => {
  const chainId = getChainId(chain);
  const quote = await okxAPI.get('quote', {
    params: {
      chainId,
      amount: amount.toString(),
      fromTokenAddress: tokenIn,
      toTokenAddress: tokenOut,
    },
  });

  return BigNumber.from(quote.data.data[0].toTokenAmount);
};
