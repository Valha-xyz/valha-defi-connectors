import poolAbi from "./abis/pool.json";
import { web3 } from "./connection";

const unitsMap = {
  6: "mwei",
  18: "ether",
};

export async function getPoolValues(
  poolAddress: string,
  tokenDecimals: number
) {
  const pool = new web3.eth.Contract(poolAbi as any, poolAddress);

  const poolValueRaw: string = await pool.methods.poolValue().call();
  const poolValue = web3.utils.fromWei(poolValueRaw, unitsMap[tokenDecimals]);

  const liquidValueRaw: string = await pool.methods.liquidValue().call();
  const liquidValue = web3.utils.fromWei(
    liquidValueRaw,
    unitsMap[tokenDecimals]
  );

  return { poolValue, liquidValue };
}
