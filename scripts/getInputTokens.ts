import { BigNumber, BigNumberish, FixedNumber } from "ethers";
import pMap from "p-map";
import {
  GetExchangeRateExport,
  InputAmounts,
  TokenPrice,
} from "../src/utils/types/liquidityProviders";
import { GetQuoteTypeExport } from "../src/utils/types/quotePrice";
import { getPool } from "../src/utils/accessors";

async function getInputTokens(
  token: string,
  amount: BigNumberish,
  poolAddress: string,
  poolType: string,
  swapType: string
): Promise<InputAmounts> {

  const pool = await getPool(poolAddress, poolType);

  // 0. In this function, we want to optimize providing liquidity to a n-pool
  // We have two equations :
  // a. The equations ensuring we don't have impermanent loss
  //				\forall i, V(X_i) = C,
  //	where Xi is the amount of the ith asset you want to deposit in the pool
  //  V(x) is the value of the amount x in USD denomination
  // b. The initial swap equation (ie. the repartition of the initial amount into all pool assets)
  //  			A = \sum_{i=0}^{n-1} X_i P_i

  // Before solving this equation, we need:
  // 1. The prices of all assets (P_i), in `token` denomination where we want to swap (swapType)
  // 2. The exchange rate of assets with each other (\frac{X_i}{X_0}, \forall i), where we want to deposit the tokens (poolType)

  // 1.
  const { getQuotePrice }: GetQuoteTypeExport = await import(
    `../src/connectors/${swapType}/analytics/liquidity-pool/getQuotePrice`
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

  const tokenInputs = exchangeRates.map(({ exchangeRate, tokenOut }) => ({
    [tokenOut]: referenceTokenAmount.mulUnsafe(exchangeRate),
  }));

  return Object.assign({}, ...tokenInputs);
}


getInputTokens(
	"0x6B175474E89094C44Da98b954EedeAC495271d0F", // 18 decimals
	"1000000000000000000",
	"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
	"uniswap/v2",
	"uniswap/v2"
).then(response=> console.log(response))


getInputTokens(
  "0x1f32b1c2345538c0c6f582fcb022739c4a194ebb", // 18 decimals - stWEth - 1500$
  "1000000000000000000", // Amount
  "0xd16232ad60188b68076a235c65d692090caba155", // Pool address
  "velodrome/v0", // Pool type
  "oneinch/v5" // Swap Type
).then((response) => console.log(response));
