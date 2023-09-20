import { BigNumber, type BigNumberish, Contract, ethers } from 'ethers';
import { type GetQuotePriceFunction } from '../../../utils/types/quotePrice';
import { getNodeProvider } from '../../../utils/getNodeProvider';
import { ROUTERABI } from '../../../connectors/synapse/v0/abi/Router';
import pools from '../../../connectors/synapse/v0/pools/pools';
import { Pool } from '../../../utils/types/connector-types';

export async function findPoolContract(
  tokenIn: string,
  tokenOut: string,
  chain: string,
  POOLS: any,
): Promise<Pool> {
  console.log('token IN ' + tokenIn);
  console.log('token Out ' + tokenOut);
  const foundPool = POOLS.find(
    (pool: any) =>
      pool.chain == chain &&
      pool.underlying_tokens.includes(tokenIn.toLowerCase()) &&
      pool.underlying_tokens.includes(tokenOut.toLowerCase()),
  );
  if (!foundPool) {
    throw 'Swap pool not found, tokens can be swapped that way on synapse';
  }
  return foundPool;
}

export async function findTokenPosition(
  token: string,
  pool: Pool,
  poolContract: Contract,
) {
  const index = pool.underlying_tokens.indexOf(token.toLowerCase());
  // We check onchain that the index is the right one
  const onChainIndex = await poolContract.getTokenIndex(token.toLowerCase(), {
    gasLimit: 10000000,
  });
  if (onChainIndex != index) {
    throw "Swap configuration, the asset index doesn't match the on-chain index";
  }
  return index;
}

export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string,
): Promise<BigNumber> => {
  const provider = getNodeProvider(chain);
  const POOLS = await pools();

  console.log('until thereee in swap get quote price ?');

  const pool = await findPoolContract(tokenIn, tokenOut, chain, POOLS);
  console.log(pool);

  const PoolContract = new ethers.Contract(
    pool.investing_address,
    ROUTERABI,
    provider,
  );

  const indexFrom = await findTokenPosition(tokenIn, pool, PoolContract);
  const indexTo = await findTokenPosition(tokenOut, pool, PoolContract);

  const amountOut = await PoolContract.calculateSwap(
    indexFrom,
    indexTo,
    amount,
  );

  console.log('Amount out is: ' + amountOut);

  // We take the maximum value of quoteAmounts
  return amountOut;
};
