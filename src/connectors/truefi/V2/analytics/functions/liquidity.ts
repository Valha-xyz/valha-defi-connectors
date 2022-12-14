import { erc20Decimals } from 'src/connectors/utils/ERC20Decimals';
import PoolTokenABI from '../../abi/PoolToken.json';
import { ethers } from 'ethers';
// import { DataNumberResponse } from 'src/interfaces/response/Internal/DataNumberInterface';
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider';

export async function checkTruefiV2Liquidity(
  chain: string,
  poolAddress: string,
): Promise<any> {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const liquidityBN = await POOL.liquidValue();
    const decimals = await erc20Decimals(provider, poolAddress);
    const liquidity = liquidityBN / 10 ** decimals;
    return { data: liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
