import { GetSwapRouterAddressFunction } from '../../../utils/types/liquidityProviders'

export const ROUTER_CONTRACT = '0xE592427A0AEce92De3Edee1F18E0157C05861564'

export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string
): Promise<string> => {
  return ROUTER_CONTRACT
}
