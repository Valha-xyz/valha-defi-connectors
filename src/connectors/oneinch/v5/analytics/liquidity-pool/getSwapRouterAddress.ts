import { GetSwapRouterAddressFunction } from '../../../../../utils/types/liquidityProviders'

const ROUTER_ADDRESS = "0x1111111254EEB25477B68fb85Ed929f73A960582";

export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string
): Promise<string> => {
  return ROUTER_ADDRESS
}