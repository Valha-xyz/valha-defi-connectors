import { erc20Decimals } from 'src/utils/ERC20Decimals';
import PoolTokenABI from 'src/connectors/truefi/V2/abi/PoolToken.json';
import { ethers } from 'ethers';
import { DataNumberResponse } from 'src/interfaces/response/Internal/DataNumberInterface';
import { getNodeProvider } from 'src/utils/getNodeProvider';

export async function checkTruefiV2TVL(
  poolAddress: string,
): Promise<DataNumberResponse> {
  try {
    const provider = await getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const TvlBN = await POOL.poolValue();
    const decimals = await erc20Decimals(provider, poolAddress);
    const TVL = TvlBN / 10 ** decimals;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
