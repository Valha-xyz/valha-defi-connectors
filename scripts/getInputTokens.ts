import { BigNumber, BigNumberish, FixedNumber } from "ethers";
import pMap from "p-map";
import {
  GetExchangeRateExport,
  InputAmounts,
  TokenPrice,
} from "../src/utils/types/liquidityProviders";
import { GetQuoteTypeExport } from "../src/utils/types/quotePrice";
import { getPool } from "../src/utils/accessors";
import { Pool } from "../src/utils/types/connector-types";
import { getSwapQuote } from "./getSwapQuote";
const _ = require("lodash");
const path = require('path');


// Connector developers for liquidity pool providers should implement the following functions : 

// 1. a getQuotePrice function (of type GetQuotePriceFunction)
//  This function should from an input of a token1, an associated amount1 and another token2 
//      return the swap result from the amount1 token1 to token2
// 2. EITHER OF
// - a getPoolExchangeRate function (type: GetExchangeRateFunction) that computes the exchange rate between two assets in the pool
// - a getMinimumDeposit function that returns the minimum deposit to the pool for a token, if deposited alone in the pool


async function getInputTokens(
  token: string,
  amount: BigNumberish,
  poolAddress: string,
  poolType: string,
  swapType: string
){  
  const pool = await getPool(poolAddress, poolType);
  if(!pool){
    throw "Pool not found"
  }
  try{  // If a minimum deposit function is present, we load it
    require.resolve(`../src/connectors/${poolType}/analytics/liquidity-pool/getMinimumDeposit`)
    return getInputTokensSingle(token, amount, pool, poolType, swapType)
  }catch{  // Else, we optimize the pool deposits for equal token repartition
    return getInputTokensEqual(token, amount, pool, poolType, swapType)
  }
}

async function getInputTokensSingle(
  token: string,
  amount: BigNumberish,
  pool: Pool,
  poolType: string,
  swapType: string
){

  // On the curve pool, we enter the pool by :
  // 1. Swapping the inputToken to the first token of the pool
  // 2. Deposit all the amount in the pool
  // We need to compute a desired lp token amount.


  const tokenSwapPrices = await getSwapQuote(
    token, amount, pool, swapType
  );

  // 2.
  const { getMinimumDeposit } = await import(
     `../src/connectors/${poolType}/analytics/liquidity-pool/getMinimumDeposit`
    );

  const minimumLpTokens = await pMap(
    tokenSwapPrices,
    async ({ tokenOut, amountOut }) => {
      return {
        tokenOut,
        lpAmount: await getMinimumDeposit(amountOut, tokenOut, pool)
      };
    }
  );

  const bestRoute = _.maxBy(minimumLpTokens, (v) => v.lpAmount);

  return [bestRoute.lpAmount];
}


async function getInputTokensEqual(
  token: string,
  amount: BigNumberish,
  pool: Pool,
  poolType: string,
  swapType: string
): Promise<InputAmounts> {


  // 0. In this function, we want to optimize providing liquidity to a n-pool
  // We have two equations :
  // a. The equations ensuring we don't have impermanent loss on equal deposit pools
  //				\forall i, V(X_i) = C,
  //	where Xi is the amount of the ith asset you want to deposit in the pool
  //  V(x) is the value of the amount x in USD denomination
  // b. The initial swap equation (ie. the repartition of the initial amount into all pool assets)
  //  			A = \sum_{i=0}^{n-1} X_i P_i

  // Before solving this equation, we need:
  // 1. The prices of all assets (P_i), in `token` denomination where we want to swap (swapType)
  // 2. The exchange rate of assets with each other (\frac{X_i}{X_0}, \forall i), where we want to deposit the tokens (poolType)

  // 1.
  const tokenSwapPrices = await getSwapQuote(
    token, amount, pool, swapType
  );

  // 2.
  const { getExchangeRate }: GetExchangeRateExport = await import(
    `../src/connectors/${poolType}/analytics/liquidity-pool/getPoolExchangeRate`
  );

  const referenceToken = tokenSwapPrices[0].tokenOut;
  const referenceTokenSwapAmount = tokenSwapPrices[0].amountOut;
  const exchangeRates = await pMap(
    tokenSwapPrices,
    async ({ tokenOut, price }) => {
      const liquidityProvidingAmount = await getExchangeRate(
        referenceTokenSwapAmount,
        referenceToken,
        tokenOut,
        pool
      );
      return {
        exchangeRate: FixedNumber.from(liquidityProvidingAmount).divUnsafe(
          FixedNumber.from(referenceTokenSwapAmount)
        ),
        price,
        referenceToken,
        tokenOut,
      };
    }
  );

  // 3. We solve the equations defined in 0.
  const referenceTokenAmount = FixedNumber.from(amount) // amount
    .divUnsafe(
      exchangeRates // divided by
        .reduce(
          (acc, c) => acc.addUnsafe(c.exchangeRate.mulUnsafe(c.price)),
          FixedNumber.from(0)
        ) // sum of all rate*price
    );

  const tokenInputs = exchangeRates.map(({ exchangeRate, tokenOut }) => 
    referenceTokenAmount.mulUnsafe(exchangeRate),
  );

  return tokenInputs.map((tokenInput)=> BigNumber.from(tokenInput))
}


getInputTokens(
	"0x6B175474E89094C44Da98b954EedeAC495271d0F", // 18 decimals
	"1000000000000000000",
	"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
	"uniswap/v2",
	"uniswap/v2"
).then(response=> console.log(response))


getInputTokens(
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // 18 decimals - stWEth - 1500$
  "1000000000000000000", // Amount
  "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490", // Pool address
  "curve/v2", // Pool type
  "oneinch/v5" // Swap Type
).then((response) => console.log(response));
