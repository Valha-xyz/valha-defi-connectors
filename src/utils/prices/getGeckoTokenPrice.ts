import { config } from 'dotenv'
import axios from 'axios'
import { GECKO_PLATFORMS } from './GeckoPlatform'
config()

export async function getGeckoTokenPrice (
  chain: string,
  tokenAddress: string
): Promise<{ data: number, err: Error }> {
  try {
    const id = GECKO_PLATFORMS[chain]
    const address = tokenAddress.toLowerCase()
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/${id}?contract_addresses=${address}&vs_currencies=${'usd'}`
    )
    const result = data[address]
    if (!result) throw new Error('Nothing found on PRICES API.')
    const usdPrice = result.usd
    return { data: usdPrice, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
