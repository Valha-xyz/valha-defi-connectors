import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { VaultABI } from 'src/connectors/alpaca-finance/abi/Vault';
import { ethers } from 'ethers';
import { getNodeProvider } from 'src/helpers/provider/getNodeProvider';

async function checkAlpacaV1TVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, VaultABI, provider);
    const TvlBN = await POOL.totalToken();
    const decimals = await erc20Decimals(provider, poolAddress);
    const TVL = TvlBN / 10 ** decimals;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAlpacaV1TVL;
