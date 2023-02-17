import { BigNumber, BigNumberish, FixedNumber } from "ethers";
import { Pool } from "../src/utils/types/connector-types";
import { TokenPrice } from "../src/utils/types/liquidityProviders";
import { GetQuoteTypeExport } from "../src/utils/types/quotePrice";
const pMap = require("p-map");

export async function getSwapQuote(token: string, amount: BigNumberish, pool: Pool, swapType: string): Promise<TokenPrice[]>{
  const { getQuotePrice }: GetQuoteTypeExport = await import(
    `../src/connectors/${swapType}/analytics/liquidity-pool/getQuotePrice`
  );

  return  pMap(
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
}