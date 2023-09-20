// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { BigNumber, type BigNumberish, Contract, ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { type Pool } from '../../../../../utils/types/connector-types';
import { BalancerSDK } from '@balancer-labs/sdk';
import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { CHAINS_ID } from '../../../../../utils/CONST/CHAINS_ID';
import { RPC_PROVIDERS } from '../../../../../utils/CONST/RPC_PROVIDERS';

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool,
): Promise<BigNumber[]> => {
  const config = {
    network: CHAINS_ID[pool.chain],
    rpcUrl: RPC_PROVIDERS[pool.chain],
  };
  const balancer = new BalancerSDK(config);
  const provider = getNodeProvider(pool.chain);
  //   const decimals = await erc20Decimals(provider, pool.pool_address);
  //   const bptAmount = ethers.utils
  //     .parseUnits(, decimals)
  //     .toString();

  const poolinfo = await balancer.pools.find(pool.metadata.pool_id);
  const { minAmountsOut } = poolinfo.buildExitExactBPTIn(
    '0x45E954acf1Efc374478dF69B45f12AEFD8AE51a3',
    amount1.toString(),
    '1',
  );

  console.log(minAmountsOut);

  //Transform String to BN
  const minAmountsBN = minAmountsOut.map((amount) => BigNumber.from(amount));

  return minAmountsBN;
};
