import PoolTokenABI from 'src/connectors/maple/V3/abi/Globals.json';
import { ethers } from 'ethers';
import { getNodeProvider } from 'src/utils/getNodeProvider';

const globalAddress = '0xC234c62c8C09687DFf0d9047e40042cd166F3600';

// only the whole protocol/ not pool?
export async function checkMapleV3Status(
  chain: string,
  poolAddress: string,
): Promise<any> {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const Global = new ethers.Contract(globalAddress, PoolTokenABI, provider);
    const Status = await Global.protocolPaused();
    return { data: !Status, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
