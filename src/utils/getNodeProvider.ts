import { ethers } from 'ethers'
import { RPC_PROVIDERS } from './CONST/RPC_PROVIDERS'
import { providers } from "ethers";
import { CachedJsonRpcProvider } from './cache/cacheProvider';
require("dotenv").config();

export function getNodeProvider (
  chain: string
): ethers.providers.BaseProvider | null {
  try {
    let provider: ethers.providers.BaseProvider =
      {} as ethers.providers.BaseProvider
    const URL = RPC_PROVIDERS[chain]
    if (!URL) throw new Error(`Provider URL not found for ${chain}`)

    provider = new providers.JsonRpcProvider(URL)
    if(process.env.USE_CACHE == "true"){
      provider = new CachedJsonRpcProvider(URL);
    }
    
    return provider
  } catch (err) {
    console.log(err)
    return null
  }
}