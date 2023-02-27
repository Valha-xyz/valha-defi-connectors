// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { BigNumber, BigNumberish, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { Pool } from '../../../../../utils/types/connector-types';
import RouterABI from '../../abi/router.json';
const pMap = require('p-map');

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain);
  const poolContract = new Contract(
    pool.investing_address,
    RouterABI.map((el) => ({
      ...el,
      gas: el.gas?.toString(),
    })),
    provider
  );

  const allAmounts = await pMap(pool.underlying_tokens, async (v, i) =>
    poolContract.calc_withdraw_one_coin(amount1, i, { gasLimit: 100000 })
  );
  //TODO , for now, but we have to change that
  return [allAmounts[0]];
};
