// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { type BigNumber, type BigNumberish, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { type Pool } from '../../../../../utils/types/connector-types';
const { POOLABI } = require('../../abi/POOL');

// This needs to return the minimum amount expected for each token.
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool,
): Promise<Number[]> => {
  const provider = getNodeProvider(pool.chain);
  const poolContract = new Contract(pool.investing_address, POOLABI, provider);
  const allAmounts = poolContract.previewAmounts(amount1);

  return allAmounts;
};
