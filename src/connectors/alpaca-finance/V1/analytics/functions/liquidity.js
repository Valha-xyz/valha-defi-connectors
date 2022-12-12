import VaultABI from 'src/connectors/alpaca-finance/V1/abi/Vault.json';
import { ethers } from 'ethers';
import { getNodeProvider } from 'src/utils/getNodeProvider';
import { erc20Decimals } from 'src/utils/ERC20Decimals';

async function checkAlpacaV1Liquidity(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, VaultABI, provider);
    const TvlBN = await POOL.totalToken();
    const DebtValBN = await POOL.vaultDebtVal();
    const decimals = await erc20Decimals(provider, poolAddress);
    const valBN = TvlBN.sub(DebtValBN);
    const liquidity = valBN / 10 ** decimals;
    return { data: liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkAlpacaV1Liquidity;
