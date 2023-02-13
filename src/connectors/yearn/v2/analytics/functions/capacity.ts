import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { VaultABI } from '../../abi/vault';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

export async function checkYearnCapacity(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider,
    );

    /// Capacity function ///
    const capacity = await POOL.availableDepositLimit();

    const decimals = await erc20Decimals(provider, poolAddress);
    const formattedCapacity = capacity / 10 ** decimals;
    return { data: formattedCapacity, err: null };
  } catch (err) {
    return { data: null, err: err };
  }
}
