// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { BigNumber, BigNumberish, Contract } from "ethers";
import { getNodeProvider } from "../../../../../utils/getNodeProvider";
import { Pool } from "../../../../../utils/types/connector-types";
import RouterABI from "./../../abi/ROUTER.json";

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain);
  const poolContract = new Contract(
    pool.investing_address,
    RouterABI,
    provider
  );

  const allAmounts = poolContract.quoteRemoveLiquidity(
    pool.underlying_tokens[0],
    pool.underlying_tokens[1],
    pool.metadata.stable,
    amount1
  );
  return allAmounts;
};
