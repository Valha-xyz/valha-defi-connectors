import { type Pool } from "./types/connector-types";

export async function getPool(
  poolAddress: string,
  poolType: string
): Promise<Pool> {
  // First we query the pool info from the poolType connector corresponding to the address
  const pools = require(`../connectors/${poolType}/pools/pools`);

  const POOLS: Pool[] = await pools();

  return POOLS.find(
    (pool) => pool.pool_address.toLowerCase() == poolAddress.toLowerCase()
  );
}
