import ERC20ABI from './abi/ERC20.json';
import { ethers } from 'ethers';
// import { useCache } from './cache/init';
require('dotenv').config();

interface ChainCacheKey {
  url: string;
  tokenAddress: string;
}

// const { getCache, setCache } = useCache<ChainCacheKey>(
//   ({ url, tokenAddress }: ChainCacheKey) =>
//     `decimals_cache_${url}_${tokenAddress}`,
// );

export async function erc20Decimals(
  provider: ethers.providers.JsonRpcProvider,
  tokenAddress: string,
): Promise<number> {
  try {
    const ERC20 = new ethers.Contract(tokenAddress, ERC20ABI, provider);
    // const cacheKey = {
    //   url: provider.connection.url,
    //   tokenAddress,
    // };
    // const cachedDecimals = await getCache(cacheKey);

    // if (cachedDecimals) {
    //   return cachedDecimals;
    // }

    const decimals = await ERC20.decimals();
    // await setCache(cacheKey, decimals);
    return decimals;
  } catch (err) {
    console.log(err);
    return 0;
  }
}
