import { GetSwapRouterAddressFunction } from '../../../utils/types/liquidityProviders';

const ROUTER_ADDRESS = '0xDef1C0ded9bec7F1a1670819833240f027b25EfF';

export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string,
  tokenIn: string,
  tokenOut: string,
): Promise<string> => {
  return ROUTER_ADDRESS;
};
