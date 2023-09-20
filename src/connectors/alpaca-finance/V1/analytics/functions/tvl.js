import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { VaultABI } from '../../abi/Vault';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';

async function checkAlpacaV1TVL(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, VaultABI, provider);
    const TvlBN = await POOL.totalToken();
    const decimals = await erc20Decimals(provider, poolAddress);
    const TVL = TvlBN / 10 ** decimals;

    const underlyingToken = await POOL.token();
    const { data, err } = await getGeckoTokenPrice(chain, underlyingToken);

    return { data: TVL * data, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAlpacaV1TVL;
