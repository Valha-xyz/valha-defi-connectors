import { GetSwapRouterAddressFunction } from '../../../utils/types/liquidityProviders';

const ROUTER_ADDRESS = '0xdef1abe32c034e558cdd535791643c58a13acc10';

export const ROUTER_CONTRACT = {
  ethereum: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  optimism: '0xdef1abe32c034e558cdd535791643c58a13acc10',
  arbitrum: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  polygon: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  celo: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  avalanche: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  bsc: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  base: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  fantom: '0xdef189deaef76e379df891899eb5a00a94cbc250',
};

export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string,
  tokenIn: string,
  tokenOut: string,
): Promise<string> => {
  return ROUTER_CONTRACT[chain];
};
