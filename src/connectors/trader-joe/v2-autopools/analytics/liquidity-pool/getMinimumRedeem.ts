// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { type BigNumber, type BigNumberish, Contract } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type Pool } from '../../../../../utils/types/connector-types'
const { POOLABI } = require('../../abi/POOL');

// This needs to return the minimum amount expected for each token.
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool
): Promise<Number[]> => {
  const provider = getNodeProvider(pool.chain)
  const poolContract = new Contract(
    pool.investing_address,
    POOLABI,
    provider
  )
  const limitLower = poolContract.limitLower();
  const limitUpper = poolContract.limitUpper();
  const currentTick = poolContract.currentTick();

  let allAmounts;

  // depending on whether the current price is within our ticks or not, we can not get the same tokens

  if (currentTick < limitUpper && currentTick > limitLower){
    const quoteLimit = poolContract.getLimitPosition();
    allAmounts = [quoteLimit.amount0*( Number(amount1) / quoteLimit.liquidity),quoteLimit.amount1*(Number(amount1) / quoteLimit.liquidity)];
  } else {
    const quoteBase = poolContract.getBasePosition();
    allAmounts = [quoteBase.amount0*( Number(amount1) / quoteBase.liquidity),quoteBase.amount1*(Number(amount1) / quoteBase.liquidity)];
  };

  return allAmounts
}
