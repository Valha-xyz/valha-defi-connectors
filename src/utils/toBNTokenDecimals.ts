import BN from 'bn.js'
import { erc20Decimals } from './ERC20Decimals'
import { getNodeProvider } from './getNodeProvider'

export async function toBnERC20Decimals (
  amount: string,
  chain: string,
  tokenAddress: string
): Promise<string | null> {
  try {
    const parsedAmount = parseFloat(amount)
    if (parsedAmount < 0 || isNaN(parsedAmount)) {
      throw new Error(`Error while parsing ${amount}`)
    }
    const decimal_precision = 5
    let decimals = 18
    if (
      tokenAddress.toLowerCase() ===
      String('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE').toLowerCase()
    ) {
      decimals = 18
    } else {
      const provider = await getNodeProvider(chain)
      if (!provider) throw new Error('No provider was found.')
      decimals = await erc20Decimals(provider, tokenAddress)
    }
    const valueWithDecimalsPrecision = parseInt(
      String(parsedAmount * 10 ** decimal_precision)
    )
    const value = new BN(String(valueWithDecimalsPrecision)).mul(
      new BN(String(10 ** (decimals - decimal_precision)))
    )
    // return a Big Number
    return value.toString()
  } catch (err) {
    console.log(err)
    return null
  }
}
