import ERC20ABI from './abi/ERC20.json';
import { ethers } from 'ethers';

export async function erc20Symbol(
  provider: ethers.providers.BaseProvider,
  tokenAddress: string,
): Promise<string> {
  try {
    const ERC20 = new ethers.Contract(tokenAddress, ERC20ABI, provider);
    const symbol = await ERC20.symbol();
    return symbol;
  } catch (err) {
    console.log(err);
    return null;
  }
}
