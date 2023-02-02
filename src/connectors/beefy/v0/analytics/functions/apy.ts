import { fetchAPY } from '../external/beefy.api';

export async function checkBeefyAPY(chain, poolId) {
  try {
    // This is bad design, we do a lot of queries :
    const apys = await fetchAPY();
    const apysBase100 = apys[poolId] ? apys[poolId] * 100 : 0;
    return { data: apysBase100, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
