import { GetSwapRouterAddressFunction } from '../../../../../utils/types/liquidityProviders'

const ROUTER_CONTRACT = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string
): Promise<string> => {
  return ROUTER_CONTRACT
}