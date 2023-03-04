import BN from 'bn.js';
import { erc20Decimals } from './ERC20Decimals';
import { getNodeProvider } from './getNodeProvider';

export async function tokenVal(
  chain: string,
  amount: number,
  tokenAddress: string
): Promise<BN | null> {
  try {
    const decimal_precision = 5;
    let decimals = 18;
    if (
      tokenAddress.toLowerCase() ===
      String('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE').toLowerCase()
    ) {
      decimals = 18;
    } else {
      const provider = getNodeProvider(chain);
      if (!provider) throw new Error('No provider was found.');
      decimals = await erc20Decimals(provider, tokenAddress);
    }
    const valueWithDecimals = parseInt(
      String(amount * 10 ** decimal_precision)
    );
    const value = new BN(String(valueWithDecimals)).mul(
      new BN(String(10 ** (decimals - decimal_precision)))
    );
    return value;
  } catch (err) {
    console.log(err);
    return null;
  }
}
