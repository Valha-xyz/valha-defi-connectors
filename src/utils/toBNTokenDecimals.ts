import { type BigNumber, ethers } from 'ethers';
import { erc20Decimals } from './ERC20Decimals';
import { getNodeProvider } from './getNodeProvider';

function truncateToStringDecimals(num: number, dec: number) {
  const calcDec = Math.pow(10, dec);
  return String(Math.trunc(num * calcDec) / calcDec);
}

export async function toBnERC20Decimals(
  amount: string,
  chain: string,
  tokenAddress: string,
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

    // TODO: improve the logic for super small amount
    if (parsedAmount < 0.000001) {
      const scale = 10 ** 12;
      const increaseParsedAmount = parsedAmount * scale;
      const amountExactDecimals = truncateToStringDecimals(
        increaseParsedAmount,
        decimals,
      );
      const BNScaleForDecimals = ethers.utils.parseUnits(
        amountExactDecimals,
        decimals,
      );

      const reduceNumber = BNScaleForDecimals.div(scale);
      console.log(reduceNumber.toString());
      return reduceNumber.toString();
    } else {
      const amountExactDecimals = truncateToStringDecimals(
        parsedAmount,
        decimals,
      );
      return ethers.utils.parseUnits(amountExactDecimals, decimals).toString();
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fromBnERC20Decimals(
  amount: BigNumber,
  chain: string,
  tokenAddress: string,
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

export async function toBnERC20DecimalsBN(
  amount: string,
  chain: string,
  tokenAddress: string,
): Promise<BigNumber | null> {
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

    // TODO: improve the logic for super small amount
    if (parsedAmount < 0.000001) {
      const scale = 10 ** 12;
      const increaseParsedAmount = parsedAmount * scale;
      const amountExactDecimals = truncateToStringDecimals(
        increaseParsedAmount,
        decimals,
      );
      const BNScaleForDecimals = ethers.utils.parseUnits(
        amountExactDecimals,
        decimals,
      );

      const reduceNumber = BNScaleForDecimals.div(scale);
      console.log(reduceNumber.toString());
      return reduceNumber;
    } else {
      const amountExactDecimals = truncateToStringDecimals(
        parsedAmount,
        decimals,
      );
      return ethers.utils.parseUnits(amountExactDecimals, decimals);
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
