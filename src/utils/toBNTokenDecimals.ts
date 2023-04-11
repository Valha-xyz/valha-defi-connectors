import BN from 'bn.js';
import { BigNumber, ethers } from 'ethers';
import { erc20Decimals } from './ERC20Decimals';
import { getNodeProvider } from './getNodeProvider';

export async function toBnERC20Decimals(
  amount: string,
  chain: string,
  tokenAddress: string
): Promise<string | null> {
  try {
    const parsedAmount = parseFloat(amount);
    if (parsedAmount < 0 || isNaN(parsedAmount)) {
      throw new Error(`Error while parsing ${amount}`);
    }
    let decimals = 18;
    if (
      tokenAddress.toLowerCase() !==
      String('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE').toLowerCase()
    ) { 
      const provider = getNodeProvider(chain);
      if (provider == null) throw new Error('No provider was found.');
      decimals = await erc20Decimals(provider, tokenAddress.toLowerCase());
    }

    return ethers.utils.parseUnits(parsedAmount.toFixed(decimals), decimals).toString();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fromBnERC20Decimals(
  amount: BigNumber,
  chain: string,
  tokenAddress: string
): Promise<string> {
  let decimals = 18;
  if (
    tokenAddress.toLowerCase() !==
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()
  ) {
    const provider = getNodeProvider(chain);
    if (provider == null) throw new Error('No provider was found.');
    decimals = await erc20Decimals(provider, tokenAddress.toLowerCase());
  }

  return ethers.utils.formatUnits(amount, decimals);
}
