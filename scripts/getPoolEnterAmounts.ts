import { BigNumber, BigNumberish } from "ethers";
import pMap from "p-map";
import {
  GetExchangeRateExport,
  InputAmounts,
} from "../src/utils/types/liquidityProviders";
import { getPool } from "../src/utils/accessors";

// We want to enter the uniswapV2 pool with only one token that is one of the two tokenA, tokenB tokens
async function getPoolEnterAmounts(
  token: string,
  amount: BigNumberish,
  poolAddress: string,
  poolType: string
): Promise<InputAmounts> {
  const pool = await getPool(poolAddress, poolType);

  // 0. We check which token we have
  // Only 2 assets in UniswapV2 pools
  if (!pool.underlying_tokens.find((t) => t == token)) {
    throw Error("The token provided should match one of the pool tokens");
  }

  // We query the price
  const { getExchangeRate }: GetExchangeRateExport = await import(
    `../src/connectors/${poolType}/analytics/liquidity-pool/getPoolExchangeRate`
  );

  const inputTokenAmount = await pMap(
    pool.underlying_tokens,
    async (tokenOut) => {
      const liquidityProvidingAmount = await getExchangeRate(
        BigNumber.from(amount),
        token,
        tokenOut,
        pool
      );
      return {
        [tokenOut]: liquidityProvidingAmount,
      };
    }
  );

  return Object.assign({}, ...inputTokenAmount);
}

getPoolEnterAmounts(
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // 18 decimals
  "1000000000000000000",
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  "uniswap/v2"
).then((response) => console.log(response));
