/* eslint-disable @typescript-eslint/no-var-requires */
import { VaultABI } from '../../abi/Vault';
import { ethers } from 'ethers';
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

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
    return { data: null, err };
  }
}

module.exports = checkAlpacaV1Outloans;
