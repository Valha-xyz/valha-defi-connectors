import { BigNumber, BigNumberish } from "ethers";

export type GetQuotePriceFunction = (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string
) => Promise<BigNumber>;

export type GetQuoteTypeExport = {
  getQuotePrice: GetQuotePriceFunction;
};
