/* eslint-disable @typescript-eslint/no-var-requires */
import { VaultABI } from '../../abi/Vault';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

async function checkAlpacaV1Liquidity(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
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
    return { data: null, err };
  }
}

module.exports = checkAlpacaV1Liquidity;
