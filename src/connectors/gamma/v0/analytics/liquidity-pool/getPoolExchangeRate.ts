import { type BigNumber, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
const { ROUTERABI } = require('../../abi/ROUTER');
import { type Pool } from '../../../../../utils/types/connector-types';
import { type GetExchangeRateFunction } from '../../../../../utils/types/liquidityProviders';

// We only want to know the exchange rate between two assets.
// This should return the amount of token2 equivalent to amount1 token1
// The method used in the UNISWAP V2 case is not optimal, because it relies on the amount1 parameter
// In the best case scenario, this function does not need the amount1 parameter and only relies on pool reserves
// This function does not assume token1 != token2
export const getExchangeRate: GetExchangeRateFunction = async (
  amount1: BigNumber,
  token1: string,
  token2: string,
  pool: Pool,
): Promise<BigNumber> => {
  const provider = getNodeProvider(pool.chain);
  const liquidityProvidingContract = new Contract(
    pool.investing_address,
    ROUTERABI,
    provider,
  );
  if (token1 == token2) {
    return amount1;
  }

  // First we get the reserves
  const [amount_min, amount_max] =
    await liquidityProvidingContract.getDepositAmount(
      pool.pool_address,
      token1,
      amount1,
    );
  const average = amount_max.add(amount_min).div(2);

  console.log('CHECK IT HEREE DUDEEEEEEE');
  console.log('TOKEN 1: ' + token1);
  console.log(amount1);
  console.log('Amount 1: ' + amount1.toString());
  console.log(amount_min.toString());
  console.log(amount_max.toString());
  console.log('AVERAGE to return');
  console.log(average);
  console.log(average.toString());
  console.log('CHECK IT HEREE DUDEEEEEEE');

  console.log('RETURNING AVERAGE');
  console.log(average.toString());

  return average;
};
