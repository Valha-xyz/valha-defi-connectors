import { fetchAPY } from "../external/beefy.api";

export async function checkBeefyAPY(chain, poolId) {
  try {
    // This is bad design, we do a lot of queries :
    const apys = await fetchAPY();
    return { data: apys[poolId], err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
