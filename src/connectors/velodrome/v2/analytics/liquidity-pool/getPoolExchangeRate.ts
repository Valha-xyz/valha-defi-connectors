import { type BigNumber, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { type Pool } from '../../../../../utils/types/connector-types';
import { type GetExchangeRateFunction } from '../../../../../utils/types/liquidityProviders';
import { ROUTERABI } from './../../abi/ROUTER';
const PoolFactory = '0xf1046053aa5682b4f9a81b5481394da16be5ff5a';

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
  const [reserve1, reserve2] = await liquidityProvidingContract.getReserves(
    token1,
    token2,
    pool.metadata.stable,
    PoolFactory,
  );

  // Then we return the equivalent amount of the othehmr token (quoteLiquidity of the contract)
  if (reserve1 == 0 || reserve2 == 0) {
    throw 'Router: INSUFFICIENT_LIQUIDITY';
  }
  return amount1.mul(reserve2).div(reserve1);
};
