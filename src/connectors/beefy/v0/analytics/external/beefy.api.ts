import { getData } from "../../../../../utils/external/utils";

export const BEEFY_API = "https://api.beefy.finance";

export async function fetchVaults() {
  return await getData(`${BEEFY_API}/vaults`);
}

export async function fetchTokens() {
  return await getData(`${BEEFY_API}/tokens`);
}

export async function fetchLps() {
  return await getData(`${BEEFY_API}/lps`);
}

export async function fetchTokenPrices() {
  return await getData(`${BEEFY_API}/prices`);
}

export async function fetchAPY() {
  return await getData(`${BEEFY_API}/apy`);
}
