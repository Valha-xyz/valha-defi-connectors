import PoolTokenABI from "../../abi/PoolToken.json";
import { ethers } from "ethers";
import { getNodeProvider } from "src/connectors/utils/getNodeProvider";
import { erc20Decimals } from "src/connectors/utils/ERC20Decimals";

export async function checkMapleV3Capacity(
  poolAddress: string,
  tokenAddress: string
): Promise<any> {
  try {
    const provider = await getNodeProvider("ethereum");
    if (!provider) throw new Error("No provider was found.");
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const liquidityCap = await POOL.liquidityCap();
    const decimals = await erc20Decimals(provider, tokenAddress);
    const capacity = liquidityCap / 10 ** decimals;
    return { data: capacity, err: null };
  } catch (err) {
    console.log(err.message);
    return { data: null, err: err };
  }
}
