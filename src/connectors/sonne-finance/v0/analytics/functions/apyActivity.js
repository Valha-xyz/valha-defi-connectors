import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { PoolABI } from '../../abi/Pool';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

async function checkSonneV0ActivityAPY(chain, poolAddress) {
  try {
    const BLOCKS = 86400;
    const days = 365;
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const SupplyBN = await POOL.supplyRatePerBlock();
    const decimals = await erc20Decimals(provider, poolAddress);
    const supplyRate = SupplyBN / 10 ** decimals;
    const ActivtyAPY = (Math.pow(1 + supplyRate * BLOCKS, days) - 1) * 100;
    return { data: ActivtyAPY, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkSonneV0ActivityAPY;
