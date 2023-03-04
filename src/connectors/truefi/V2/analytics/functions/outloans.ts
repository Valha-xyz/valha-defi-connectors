import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { PoolTokenABI } from '../../abi/PoolToken';
import { ethers } from 'ethers';
// import { DataNumberResponse } from 'src/interfaces/response/Internal/DataNumberInterface';
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider';

export async function checkTruefiV2Outloans(
  chain: string,
  poolAddress: string
): Promise<any> {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const OutloansBN = await POOL.loansValue();
    const decimals = await erc20Decimals(provider, poolAddress);
    const outloans = OutloansBN / 10 ** decimals;
    return { data: outloans, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}
