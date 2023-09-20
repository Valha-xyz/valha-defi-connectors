import { GetSwapRouterAddressFunction } from '../../../utils/types/liquidityProviders';

export const ROUTER_CONTRACT = {
  ethereum: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  optimism: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  arbitrum: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  polygon: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  celo: '',
  avalanche: '',
  bsc: '',
  base: '',
};

export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string,
  tokenIn: string,
  tokenOut: string,
): Promise<string> => {
  return ROUTER_CONTRACT[chain];
};
