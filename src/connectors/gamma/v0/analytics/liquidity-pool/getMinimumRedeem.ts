// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { type BigNumber, type BigNumberish, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { type Pool } from '../../../../../utils/types/connector-types';
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const { POOLABI } = require('../../abi/POOL');

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool,
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain);
  const poolContract = new Contract(pool.pool_address, POOLABI, provider);
  const poolToken0 = new Contract(pool.underlying_tokens[0], ERC20ABI, provider);
  const poolToken1 = new Contract(pool.underlying_tokens[0], ERC20ABI, provider);
  console.log('IN MINIMUM REDEEEEEM');

  // const limitLower = await poolContract.limitLower();
  // const limitUpper = await poolContract.limitUpper();
  // const currentTick = await poolContract.currentTick();

  // let allAmounts: BigNumber[];

  // depending on whether the current price is within our ticks or not, we can not get the same tokens

  // if (currentTick < limitUpper && currentTick > limitLower) {
  //   const quoteLimit = await poolContract.getLimitPosition();
  //   const value1 = quoteLimit.amount0.mul(amount1).div(quoteLimit.liquidity);
  //   const value2 = quoteLimit.amount1.mul(amount1).div(quoteLimit.liquidity);
  //   allAmounts = [value1, value2];
  // } else {
  //   const quoteBase = await poolContract.getBasePosition();

  //   console.log('BASE');
  //   console.log(quoteBase);
  //   const value1 = quoteBase.amount0.mul(amount1).div(quoteBase.liquidity);
  //   const value2 = quoteBase.amount1.mul(amount1).div(quoteBase.liquidity);
  //   allAmounts = [value1, value2];
  // }

  // console.log('into GAMMA: ');
  // console.log(allAmounts);

  const totalAmounts = await poolContract.getTotalAmounts();
  const total0BN = totalAmounts.total0;
  const total1BN = totalAmounts.total1;
  const decimalToken0 = await poolToken0.decimals();
  const decimalToken1 = await poolToken1.decimals();
  const total0 = total0BN.div(10**decimalToken0);
  const total1 =total1BN.div(10**decimalToken1); 


  const totalSupplyBN = await poolContract.totalSupply();
  const decimalSupplyBN = await poolContract.decimals();
  
  const totalSupply = totalSupplyBN.div(10**decimalSupplyBN);

  const liquidity0 = total0.mul(amount1).div(totalSupply);
  const liquidity1 = total1.mul(amount1).div(totalSupply);

  const allAmounts = [liquidity0,liquidity1];

  return allAmounts;
};
