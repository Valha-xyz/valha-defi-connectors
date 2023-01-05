import { getCurrentBlock } from '../../../../../utils/getCurrentBlock';
import PoolTokenABI from '../../abi/PoolToken.json';
import GlobalABI from '../../abi/Globals.json';
import { ethers } from 'ethers';
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider';

const globalAddress = '0xC234c62c8C09687DFf0d9047e40042cd166F3600';

export async function checkMapleV3Cooldown(
  poolAddress: string,
  userAddress: string,
): Promise<any> {
  try {
    //Pool.withdrawCooldown(userRelayerAddress) + lpCooldownPeriod
    const provider = await getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const GLOBALS = new ethers.Contract(globalAddress, GlobalABI, provider);
    const dataGlobals = await GLOBALS.getLpCooldownParams();
    const lpCooldownPeriod = parseInt(dataGlobals[0].toString());
    const currentBlockData = await getCurrentBlock();
    const currentTimestamp = currentBlockData.data.timestamp;
    const userWithdrawCooldownBN = await POOL.withdrawCooldown(userAddress);
    const userWithdrawCooldown = parseInt(userWithdrawCooldownBN.toString());
    let remainingCooldown = 0;
    const cooldownPeriod = userWithdrawCooldown + lpCooldownPeriod;
    if (cooldownPeriod > currentTimestamp) {
      remainingCooldown = cooldownPeriod - currentTimestamp;
    }
    return { data: remainingCooldown, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
