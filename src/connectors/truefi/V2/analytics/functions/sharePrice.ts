import { PoolTokenABI } from '../../abi/PoolToken';
import { ethers } from 'ethers';
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider';

export async function checkTruefiV2Share(
  chain: string,
  poolAddress: string,
): Promise<any> {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const TotalSupply = await POOL.totalSupply();
    const PoolValue = await POOL.poolValue();
    const precision = 10 ** 6;
    const precisionBN = ethers.BigNumber.from(precision);
    const PoolValuePrecision = PoolValue.mul(precisionBN);
    const sharePriceBN = PoolValuePrecision.div(TotalSupply);
    const sharePrice = sharePriceBN.toString() / precision;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
