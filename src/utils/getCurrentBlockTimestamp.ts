import { config } from 'dotenv';
import { getNodeProvider } from './getNodeProvider';
import { DataNumberResponse } from './types/utils';
config();

export async function getCurrentBlockTimestamp(): Promise<DataNumberResponse> {
  try {
    // const apiURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY_ETHEREUM}`;
    const provider = getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const blockNumber = await provider.getBlockNumber();

    const blockTimestamp = (await provider.getBlock(blockNumber)).timestamp;
    return { data: blockTimestamp, err: null };
  } catch (err) {
    console.log('ERROR -------------------------');
    console.log(err.response.data);
    return { data: null, err };
  }
}
