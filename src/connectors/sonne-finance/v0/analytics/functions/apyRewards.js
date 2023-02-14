import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { PoolABI } from '../../abi/Pool';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

async function checkSonneV0RewardsAPY(
  chain,
  poolAddress,
  usdPrice,
  totalSupplyUSD
) {
  try {
    const BLOCKS = 86400;
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const DistributionBN = await POOL.compSupplySpeeds();
    const Distribution = DistributionBN / 10 ** decimals;
    const RewardsAPY =
      ((Distribution * BLOCKS * 365 * usdPrice) / totalSupplyUSD) * 100;
    return { data: RewardsAPY, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkSonneV0RewardsAPY;
