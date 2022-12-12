import { erc20Decimals } from 'src/utils/ERC20Decimals';
import VaultABI from 'src/connectors/alpaca-finance/V1/abi/Vault.json';
import { ethers } from 'ethers';
import { getNodeProvider } from 'src/utils/getNodeProvider';

async function checkAlpacaV1Outloans(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, VaultABI, provider);
    const TvlBN = await POOL.vaultDebtVal();
    const decimals = await erc20Decimals(provider, poolAddress);
    const TVL = TvlBN / 10 ** decimals;
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkAlpacaV1Outloans;
