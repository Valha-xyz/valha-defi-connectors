import { type BigNumber, type BigNumberish } from "ethers";
import { type Pool } from "./connector-types";

export type GetQuotePriceFunction = (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string
) => Promise<BigNumber>;

export interface GetQuoteTypeExport {
  getQuotePrice: GetQuotePriceFunction;
}
