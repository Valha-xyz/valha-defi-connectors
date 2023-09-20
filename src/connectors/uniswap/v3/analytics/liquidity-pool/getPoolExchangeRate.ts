import { ethers, type BigNumber } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { type Pool } from '../../../../../utils/types/connector-types';
import { type GetExchangeRateFunction } from '../../../../../utils/types/liquidityProviders';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { QUOTER_CONTRACT_ADDRESS } from '../../../../../swaps/uniswap/v3/getQuotePrice';

// We only want to know the exchange rate between two assets.
// In the best case scenario, this function does not need the amount1 parameter and only relies on pool reserves
// This function does not assume token1 != token2
export const getExchangeRate: GetExchangeRateFunction = async (
  amount1: BigNumber,
  token1: string,
  token2: string,
  pool: Pool,
): Promise<BigNumber> => {
  if (token1 == token2) {
    return amount1;
  }

  const provider = getNodeProvider(pool.chain);
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    provider,
  );

  // We get a quote for the assets from the pool directly
  // This is not the best practice, but it allows one to still get an approximate quote for the assets
  const quote = await quoterContract.callStatic.quoteExactInputSingle(
    token1,
    token2,
    0,
    amount1,
    0,
  );
  return quote;
};
