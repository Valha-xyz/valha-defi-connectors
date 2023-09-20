import { BigNumber, Contract, ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { type Pool } from '../../../../../utils/types/connector-types';
import { CHAINS_ID } from '../../../../../utils/CONST/CHAINS_ID';
import { RPC_PROVIDERS } from '../../../../../utils/CONST/RPC_PROVIDERS';
import { BalancerSDK } from '@balancer-labs/sdk';
import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
const { ROUTERABI } = require('../../abi/ROUTERABI');

export async function findTokenPosition(
  token: string,
  pool: Pool,
  poolContract: Contract,
) {
  const index = pool.underlying_tokens.indexOf(token.toLowerCase());
  // We check onchain that the index is the right one
  console.log('index');
  console.log(index);
  return index;
}

export const getMinimumDeposit = async (
  amount1: BigNumber,
  token1: string, // Token OF THE POOL that you will actually enter with
  pool: Pool,
): Promise<BigNumber> => {
  const provider = getNodeProvider(pool.chain);
  let abi = ROUTERABI;
  const poolContract = new Contract(pool.investing_address, abi, provider);

  const poolSize = pool.underlying_tokens.length;
  const amounts = Array.from({ length: poolSize }, (v) => '0');
  amounts[await findTokenPosition(token1, pool, poolContract)] =
    amount1.toString();

  const config = {
    network: CHAINS_ID[pool.chain],
    rpcUrl: RPC_PROVIDERS[pool.chain],
  };

  const balancer = new BalancerSDK(config);

  const poolinfo = await balancer.pools.find(pool.metadata.pool_id);

  console.log(amounts);
  console.log(pool.underlying_tokens);

  const { minBPTOut } = poolinfo.buildJoin(
    '0x45E954acf1Efc374478dF69B45f12AEFD8AE51a3',
    pool.underlying_tokens,
    amounts,
    '1',
  );

  console.log('inside balancer!!');
  console.log(minBPTOut);

  //Transform String to BN
  return BigNumber.from(minBPTOut);
};
