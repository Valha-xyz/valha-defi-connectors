import { config } from 'dotenv'
import axios from 'axios'
import { GECKO_PLATFORMS } from './GeckoPlatform'
import { useCache } from '../cache/init';

config()

interface PriceCacheKey{
    platform :string;
    chain: string,
    tokenAddress: string,
}

const {
    getCache,
    setCache
} = useCache<PriceCacheKey>(
    ({platform, chain, tokenAddress }: PriceCacheKey) => `price_cache_${platform}_${chain}_${tokenAddress}`
)

const PRICE_PLATFORM = "coin_gecko"

export async function getGeckoTokenPrice (
  chain: string,
  tokenAddress: string
): Promise<{ data: number | null, err: Error | null }> {
  try {
    const id = GECKO_PLATFORMS[chain]
    const address = tokenAddress.toLowerCase()

    const cachedPrice = await getCache({
      platform: PRICE_PLATFORM,
      chain,
      tokenAddress
    })
    if(cachedPrice){
      return { data: cachedPrice, err: null }
    }

    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/${id}?contract_addresses=${address}&vs_currencies=${'usd'}`
    )

    const result = data[address]

    if (!result) throw new Error('Nothing found on PRICES API.')
    const usdPrice = result.usd

    await setCache({
      platform: PRICE_PLATFORM,
      chain,
      tokenAddress
    }, usdPrice)

    return { data: usdPrice, err: null }

  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
