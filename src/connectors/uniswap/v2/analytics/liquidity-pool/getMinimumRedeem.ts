// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { BigNumber, BigNumberish, Contract } from "ethers";
import { getNodeProvider } from "../../../../../utils/getNodeProvider";
import { Pool } from "../../../../../utils/types/connector-types";
import RouterABI from "./../../abi/uniswapv2-router.json";

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount: BigNumberish,
  pool: Pool
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain);
  const poolContract = new Contract(
    pool.investing_address,
    RouterABI,
    provider
  );

  // TODO this is not tested, because I don't have liquidity in that pool (and it reverts when you don't have liquidity)
  const allAmounts = await poolContract
    .callStatic
    .removeLiquidity(
      pool.underlying_tokens[0],
      pool.underlying_tokens[1],
      amount,
      0,
      0,
      pool.pool_address,
      10000000000
    )
  console.log(allAmounts)

  return allAmounts
};
