import { getChainId } from '../../../../../utils/getChainId';
import { getData } from '../../../../../utils/external/utils';

export const VAULT_EXTENDED_API_ADDR =
  'https://ydaemon.yearn.finance/1/vaults/all?hideAlways=true&orderBy=apy.net_apy&orderDirection=desc&strategiesDetails=withDetails&strategiesRisk=withRisk&strategiesCondition=inQueue';

export async function fetchVaults() {
  return await getData(VAULT_EXTENDED_API_ADDR);
}

export async function fetchVaultInfo(chain: string) {
  const id = getChainId(chain);
  const URL = `https://ydaemon.yearn.finance/${id}/vaults/all?hideAlways=true&orderBy=apy.net_apy&orderDirection=desc&strategiesDetails=withDetails&strategiesRisk=withRisk&strategiesCondition=inQueue`;
  return await getData(URL);
}
