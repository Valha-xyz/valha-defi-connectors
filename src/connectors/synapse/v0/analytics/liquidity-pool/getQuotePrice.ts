import { type BigNumber, type BigNumberish, Contract } from 'ethers';
import { type GetQuotePriceFunction } from '../../../../../utils/types/quotePrice';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import pools from '../../pools/pools.js';

import { type Pool } from '../../../../../utils/types/connector-types';
import { ROUTERABI } from '../../abi/Router';

export async function findPoolContract(
  tokenIn: string,
  tokenOut: string,
  chain: string,
): Promise<Pool> {
  const POOLS = await pools();
  const foundPool = POOLS.find(
    (pool) =>
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
  const index = pool.underlying_tokens.indexOf(token);
  // We check onchain that the index is the right one
  const onChainAddress = await poolContract.coins(index, { gasLimit: 1000000 });
  if (onChainAddress != token) {
    throw "Swap configuration is bad for curve/v2, the asset index doesn't match the on-chain index";
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
  const pool = await findPoolContract(tokenIn, tokenOut, chain);
  const abi = ROUTERABI;
  const poolContract = new Contract(pool.investing_address, abi, provider);

  console.log('just hereeeeee');

  const index0 = await poolContract.getTokenIndex(tokenIn);
  const index1 = await poolContract.getTokenIndex(tokenOut);

  console.log('QUOTEEEEE');
  console.log(tokenIn);
  console.log(tokenOut);
  console.log(amount);

  const testValue = poolContract.calculateSwap(index0, index1, amount);

  console.log(testValue);

  return testValue;
};
