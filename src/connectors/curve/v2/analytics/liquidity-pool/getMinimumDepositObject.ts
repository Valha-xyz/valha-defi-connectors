import { BigNumber, BigNumberish, FixedNumber } from "ethers";
import pMap from "p-map";
import {
  GetExchangeRateExport,
  InputAmounts,
  TokenPrice,
} from "../../../../../utils/types/liquidityProviders";
import { GetQuoteTypeExport } from "../../../../../utils/types/quotePrice";
import { getPool } from "../../../../../utils/accessors";
const _ = require("lodash");

async function getInputTokens(
  token: string,
  amount: BigNumberish,
  poolAddress: string,
  poolType: string,
  swapType: string
): Promise<InputAmounts> {

  const pool = await getPool(poolAddress, poolType);

  // On the curve pool, we enter the pool by : 
  // 1. Swapping the inputToken to the first token of the pool
  // 2. Deposit all the amount in the pool
  // We need to compute a desired lp token amount. 

  // 1.
  const { getQuotePrice }: GetQuoteTypeExport = await import(
    `../../../../../connectors/${swapType}/analytics/liquidity-pool/getQuotePrice`
  );

  const tokenSwapPrices: TokenPrice[] = await pMap(
    pool.underlying_tokens,
    async (tokenOut) => {
      const swapAmount = await getQuotePrice(
        token,
        amount,
        tokenOut,
        pool.chain
      );
      return {
        tokenIn: token,
        tokenOut,
        amountIn: BigNumber.from(amount),
        amountOut: swapAmount,
        price: FixedNumber.from(amount).divUnsafe(FixedNumber.from(swapAmount)),
      };
    }
  );

  // 2.
  const { getMinimumDeposit } = await import(
    `./getMinimumDeposit`
  );

  const minimumLpTokens = await pMap(tokenSwapPrices, async ({tokenOut, amountOut}) => {
    return {
      tokenOut,
      lpAmount: await getMinimumDeposit(amountOut,tokenOut, pool).then((t)=> t.toString()),
  }})

  const bestRoute = _.maxBy(minimumLpTokens, (v) => v.lpAmount);

  return {
    [bestRoute.tokenOut]: bestRoute.lpAmount
  }
}
getInputTokens(
	"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // 18 decimals
	"1000000000000000000",
	"0x6c3f90f043a72fa612cbac8115ee7e52bde6e490",
	"curve/v2",
	"uniswap/v2"
).then(response=> console.log(response))
