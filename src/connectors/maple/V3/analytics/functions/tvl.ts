import { getNodeProvider } from 'src/utils/getNodeProvider';
import PoolTokenABI from 'src/connectors/maple/V3/abi/PoolToken.json';
import { ethers } from 'ethers';
import { DIGITAL_USD } from 'src/utils/CONST/DIGITAL_USD';
import { getUSDETH } from 'src/utils/prices/getUSDETH';

export async function checkMapleV3TVL(
  poolAddress: string,
  tokenAddress: string,
): Promise<any> {
  try {
    const provider = await getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const TvlBN = await POOL.totalSupply();
    const decimals = 18;
    let TVL = TvlBN / 10 ** decimals;
    if (!DIGITAL_USD.includes(tokenAddress.toLowerCase())) {
      const { data, err } = await getUSDETH();
      if (err) throw new Error(err.message);
      const exchangePrice = data;
      TVL = TVL * exchangePrice;
    }
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
