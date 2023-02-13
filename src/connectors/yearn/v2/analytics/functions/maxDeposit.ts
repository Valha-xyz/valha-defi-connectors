import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { VaultABI } from '../../abi/vault';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

export async function checkYearnMaxDeposit(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider,
    );

    /// TVL function ///
    const maxDeposit = await POOL.availableDepositLimit();

    const decimals = await erc20Decimals(provider, poolAddress);
    const formattedMaxDeposit = maxDeposit / 10 ** decimals;
    return { data: formattedMaxDeposit, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
