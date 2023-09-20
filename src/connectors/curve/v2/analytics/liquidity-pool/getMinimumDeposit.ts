import { BigNumber, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

import { RouterABI2 } from './../../abi/router2';
import { RouterABI3 } from './../../abi/router3';

import { type Pool } from '../../../../../utils/types/connector-types';
import { findTokenPosition } from './getQuotePrice';

export const getMinimumDeposit = async (
  amount1: BigNumber,
  token1: string, // Token OF THE POOL that you will actually enter with
  pool: Pool,
): Promise<BigNumber> => {
  const provider = getNodeProvider(pool.chain);
  const size = pool.underlying_tokens.length;
  let abi;
  if (pool.metadata.abi) {
    abi = JSON.parse(pool.metadata.abi);
  } else if (size === 2) {
    abi = RouterABI2;
  } else if (size === 3) {
    abi = RouterABI3;
  } else {
    throw new Error('Error: pool size is not handle.');
  }
  const poolContract = new Contract(pool.investing_address, abi, provider);

  const poolSize = pool.underlying_tokens.length;
  const amounts = Array.from({ length: poolSize }, (v) => BigNumber.from(0));
  amounts[await findTokenPosition(token1, pool, poolContract)] = amount1;

  const test = await poolContract.calc_token_amount(amounts, true, {
    gasLimit: 10000000,
  });
  return test;
};
