// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { type BigNumber, type BigNumberish, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { type Pool } from '../../../../../utils/types/connector-types';
import { toBnERC20DecimalsBN } from '../../../../../utils/toBNTokenDecimals';
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const { POOLABI } = require('../../abi/POOL');

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  poolAmount: BigNumberish,
  pool: Pool,
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain);
  const poolContract = new Contract(pool.pool_address, POOLABI, provider);
  const poolToken0 = new Contract(
    pool.underlying_tokens[0],
    ERC20ABI,
    provider,
  );
  const poolToken1 = new Contract(
    pool.underlying_tokens[1],
    ERC20ABI,
    provider,
  );

  const totalAmounts = await poolContract.getTotalAmounts();
  const total0BN = totalAmounts.total0;
  const total1BN = totalAmounts.total1;
  const decimalToken0 = await poolToken0.decimals();
  const decimalToken1 = await poolToken1.decimals();
  const total0NotBn = total0BN / 10 ** decimalToken0;
  const total1NotBn = total1BN / 10 ** decimalToken1;
  const totalSupplyBN = await poolContract.totalSupply();
  const decimalSupplyBN = await poolContract.decimals();
  const totalSupplyNotBn = totalSupplyBN / 10 ** decimalSupplyBN;
  const poolAmountNotBn =
    parseFloat(poolAmount.toString()) / 10 ** decimalSupplyBN;

  const liquidity0 = (total0NotBn * poolAmountNotBn) / totalSupplyNotBn;
  const liquidity1 = (total1NotBn * poolAmountNotBn) / totalSupplyNotBn;

  console.log('how much we will get????: ');
  console.log(liquidity0);
  console.log(liquidity1);

  const expectedAmount0 = await toBnERC20DecimalsBN(
    String(liquidity0),
    pool.chain,
    pool.underlying_tokens[0],
  );
  const expectedAmount1 = await toBnERC20DecimalsBN(
    String(liquidity1),
    pool.chain,
    pool.underlying_tokens[1],
  );

  const allAmounts = [expectedAmount0, expectedAmount1];

  return allAmounts;
};
