import { type BigNumberish, type BigNumber, type FixedNumber } from 'ethers'
import { type Pool } from './connector-types'

export type InputAmounts = BigNumber[]

export interface TokenPrice {
  tokenIn: string
  tokenOut: string
  amountIn: BigNumber
  amountOut: BigNumber
  price: FixedNumber
}

export interface TokenPriceHuman {
  tokenIn: string
  tokenOut: string
  amountIn: string
  amountOut: string
  price: FixedNumber
}

export interface ExchangeRate {
  price: FixedNumber
  exchangeRate: FixedNumber
  referenceToken: string
  tokenOut: string
}


export type GetQuotePriceFunction = (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string,
) => Promise<BigNumber>

export interface GetQuoteTypeExport {
  getQuotePrice: GetQuotePriceFunction
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

export type GetPoolEnterLPQuoteFunction = (
  tokens: string[],
  amounts: BigNumberish[],
  pool: Pool
) => Promise<BigNumber>

export interface GetPoolEnterLPQuoteExport {
  getPoolEnterLPQuote: GetPoolEnterLPQuoteFunction
}

export type GetMinimumRedeemFunction = (
  amount: BigNumberish,
  pool: Pool
) => Promise<BigNumber[]>

export interface GetMinimumRedeemExport {
  getMinimumRedeem: GetMinimumRedeemFunction
}

export type GetSwapCalldataFunction = (
  chain: string,
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  swapperAddress: string
) => Promise<{
  calldata: string
}>

export interface GetSwapCalldataExport {
  getSwapCalldata: GetSwapCalldataFunction
}