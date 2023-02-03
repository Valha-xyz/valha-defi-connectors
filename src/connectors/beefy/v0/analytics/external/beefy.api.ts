import { getData } from '../../../../../utils/external/utils';

export const BEEFY_API = 'https://api.beefy.finance';

export async function fetchVaults() {
  return getData(`${BEEFY_API}/vaults`);
}

export async function fetchTokens() {
  return getData(`${BEEFY_API}/tokens`);
}

export async function fetchLps() {
  return getData(`${BEEFY_API}/lps`);
}

export async function fetchTokenPrices() {
  return getData(`${BEEFY_API}/prices`);
}

export async function fetchAPY() {
  return getData(`${BEEFY_API}/apy`);
}
