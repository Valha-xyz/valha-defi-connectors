import { config } from 'dotenv';
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider';
config();
import { DataNumberResponse } from 'src/interfaces/response/Internal/DataNumberInterface';

export async function getBlockTimestamp(
  blockNumber: string,
): Promise<DataNumberResponse> {
  try {
    // const apiURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY_ETHEREUM}`;
    const provider = await getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const blockInfo = await provider.getBlock(blockNumber);

    const blockTimestamp = blockInfo.timestamp;
    return { data: blockTimestamp, err: null };
  } catch (err) {
    console.log('ERROR -------------------------');
    console.log(err.response.data);
    return { data: null, err: err };
  }
}
