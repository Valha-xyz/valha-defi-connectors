import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { RewardsABI } from '../../abi/Staking';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

async function checkSonneV0RewardsAPY(
  chain,
  rewardAddress,
  underlyingDecimals,
  usdPrice,
  totalSupplyUSD,
  poolAddress,
) {
  try {
    const BLOCKS = 86400;
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(rewardAddress, RewardsABI, provider);
    const DistributionBN = await POOL.compSupplySpeeds(poolAddress);
    const Distribution = DistributionBN / 10 ** underlyingDecimals;
    const RewardsAPY =
      ((Distribution * BLOCKS * 365 * usdPrice) / totalSupplyUSD) * 100;
    return { data: RewardsAPY, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkSonneV0RewardsAPY;
