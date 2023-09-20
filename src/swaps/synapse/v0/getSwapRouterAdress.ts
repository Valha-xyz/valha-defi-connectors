import { BigNumber, type BigNumberish } from 'ethers';
import axios from 'axios';
import { GetSwapRouterAddressFunction } from '../../../utils/types/liquidityProviders';
import { SYNAPSE_API } from './apiconst';
import { CHAINS_ID } from '../../../utils/CONST/CHAINS_ID';
import { erc20Symbol } from '../../../utils/ERC20Symbol';
import { getNodeProvider } from '../../../utils/getNodeProvider';

export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string,
  tokenIn: string,
  tokenOut: string,
): Promise<string> => {
  const provider = getNodeProvider(chain);
  const symbolFrom = await erc20Symbol(provider, tokenIn);
  const symbolTo = await erc20Symbol(provider, tokenOut);
  const { data } = await axios.get(
    `${SYNAPSE_API}/swap?chain=${CHAINS_ID[chain]}&fromToken=${symbolFrom}&toToken=${symbolTo}&amount=100`,
  );
  console.log(data);
  return data.routerAddress;
};
