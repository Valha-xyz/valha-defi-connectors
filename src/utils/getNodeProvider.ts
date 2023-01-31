import { ethers } from "ethers";
import { RPC_PROVIDERS } from "./CONST/RPC_PROVIDERS";

export async function getNodeProvider(
  chain: string
): Promise<ethers.providers.BaseProvider | null> {
  try {
    let provider: ethers.providers.BaseProvider =
      {} as ethers.providers.BaseProvider;
    const URL = RPC_PROVIDERS[chain];
    if (!URL) throw new Error(`Provider URL not found for ${chain}`);
    provider = new ethers.providers.JsonRpcProvider(URL);
    return provider;
  } catch (err) {
    console.log(err);
    return null;
  }
}
