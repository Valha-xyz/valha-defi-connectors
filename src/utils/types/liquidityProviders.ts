import { type BigNumber, type FixedNumber } from 'ethers'

export type InputAmounts = Record<string, BigNumber>

export interface TokenPrice {
  tokenIn: string
  tokenOut: string
  amountIn: BigNumber
  amountOut: BigNumber
  price: FixedNumber
}

export interface ExchangeRate {
  price: FixedNumber
  exchangeRate: FixedNumber
  referenceToken: string
  tokenOut: string
}

export type GetExchangeRateFunction = (
  amount1: BigNumber,
  token1: string,
  token2: string,
  pool: Pool
) => Promise<BigNumber>

export interface GetExchangeRateExport {
  getExchangeRate: GetExchangeRateFunction
}
