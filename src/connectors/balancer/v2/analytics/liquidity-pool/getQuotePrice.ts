import { QUERYABI } from './../../abi/QUERY';
import { type BigNumber, type BigNumberish, Contract } from 'ethers';
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import pools from '../../pools/pools.js';

import { type Pool } from '../../../../../utils/types/connector-types';

export async function findPoolContract(
  tokenIn: string,
  tokenOut: string,
  chain: string,
  POOLS: any,
): Promise<Pool> {
  const foundPool = POOLS.find(
    (pool) =>
      pool.chain == chain &&
      pool.underlying_tokens.includes(tokenIn) &&
      pool.underlying_tokens.includes(tokenOut),
  );
  if (!foundPool) {
    throw 'Swap pool not found, tokens can be swapped that way on curve';
  }
  return foundPool;
}

export const getQuotePrice: GetQuotePriceFunction = async (
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  chain: string,
): Promise<BigNumber> => {
  const QUERY_ADDRESS = '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5'; // same address on all chains
  const provider = getNodeProvider(chain);
  const POOLS = await pools();
  const poolInfo = await findPoolContract(tokenIn, tokenOut, chain, POOLS);
  const abi = QUERYABI;
  const queryContract = new Contract(QUERY_ADDRESS, abi, provider);

  const singleSwap = {
    poolId: poolInfo.metadata.pool_id,
    kind: 0,
    assetIn: tokenIn,
    assetOut: tokenOut,
    amount: amount,
    userData: '0x',
  };
  const funds = {
    sender: '0x45E954acf1Efc374478dF69B45f12AEFD8AE51a3',
    fromInternalBalance: false,
    recipient: '0x45E954acf1Efc374478dF69B45f12AEFD8AE51a3',
    toInternalBalance: false,
  };

  return queryContract.querySwap(singleSwap, funds);
};
