import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { VaultABI } from '../../abi/vault';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

export async function checkYearnLiquidity(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider
    );

    /// TVL function ///
    const pricePerShare = await POOL.pricePerShare();
    const maxShares = await POOL.maxAvailableShares();
    const liquidity = pricePerShare * maxShares;

    const decimals = await erc20Decimals(provider, poolAddress);
    const formattedLiquidity = liquidity / 10 ** (2 * decimals);
    return { data: formattedLiquidity, err: null };
  } catch (err) {
    return { data: null, err };
  }
}
