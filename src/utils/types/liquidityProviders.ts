import { BigNumberish, type BigNumber, type FixedNumber } from "ethers";
import { Pool } from "./connector-types";

export type InputAmounts = BigNumber[];

export interface TokenPrice {
  tokenIn: string;
  tokenOut: string;
  amountIn: BigNumber;
  amountOut: BigNumber;
  price: FixedNumber;
}

export interface ExchangeRate {
  price: FixedNumber;
  exchangeRate: FixedNumber;
  referenceToken: string;
  tokenOut: string;
}

export type GetExchangeRateFunction = (
  amount1: BigNumber,
  token1: string,
  token2: string,
  pool: Pool
) => Promise<BigNumber>;

export interface GetExchangeRateExport {
  getExchangeRate: GetExchangeRateFunction;
}


export type GetMinimumRedeemFunction = (
  amount: BigNumberish,
  pool: Pool
) => Promise<BigNumber[]>;

export interface GetMinimumRedeemExport {
  getMinimumRedeem: GetMinimumRedeemFunction
}
