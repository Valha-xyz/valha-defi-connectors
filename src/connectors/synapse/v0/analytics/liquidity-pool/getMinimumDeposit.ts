import { BigNumber, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

import { type Pool } from '../../../../../utils/types/connector-types';
import { ROUTERABI } from '../../abi/Router';

export const getMinimumDeposit = async (
  amount1: BigNumber,
  token1: string, // Token OF THE POOL that you will actually enter with
  pool: Pool,
): Promise<BigNumber> => {
  const provider = getNodeProvider(pool.chain);
  const abi = ROUTERABI;
  const poolContract = new Contract(pool.investing_address, abi, provider);

  const poolSize = pool.underlying_tokens.length;
  const amounts = Array.from({ length: poolSize }, (v) => BigNumber.from(0));
  const index = await poolContract.getTokenIndex(token1);
  amounts[index] = amount1;

  const test = await poolContract.calculateTokenAmount(amounts, true);
  console.log(test);
  return test;
};
