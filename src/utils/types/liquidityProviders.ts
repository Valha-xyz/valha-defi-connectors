import { BigNumber, FixedNumber } from "ethers";

export type InputAmounts = Record<string, BigNumber>;

export type TokenPrice = {
  tokenIn: string;
  tokenOut: string;
  amountIn: BigNumber;
  amountOut: BigNumber;
  price: FixedNumber;
};

export type ExchangeRate = {
  price: FixedNumber;
  exchangeRate: FixedNumber;
  referenceToken: string;
  tokenOut: string;
};

export type GetExchangeRateFunction = (
  amount1: BigNumber,
  token1: string,
  token2: string,
  pool: Pool
) => Promise<BigNumber>;

export type GetExchangeRateExport = {
  getExchangeRate: GetExchangeRateFunction;
};
