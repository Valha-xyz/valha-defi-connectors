import { getData } from "../../../../../utils/external/utils";

export const VAULT_EXTENDED_API_ADDR =
  "https://ydaemon.yearn.finance/1/vaults/all?hideAlways=true&orderBy=apy.net_apy&orderDirection=desc&strategiesDetails=withDetails&strategiesRisk=withRisk&strategiesCondition=inQueue";

export async function fetchVaults() {
  return getData(VAULT_EXTENDED_API_ADDR);
}

export async function fetchVaultInfo() {
  return getData(VAULT_EXTENDED_API_ADDR);
}
