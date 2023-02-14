/* eslint-disable @typescript-eslint/no-var-requires */
import { VaultABI } from '../../abi/Vault';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkCompoundV2Share(chain, poolAddress, underlyingDecimals) {
  try {
    const COMPPrecision = 18;
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, VaultABI, provider);
    const ExchangeRateBN = await POOL.exchangeRateStored();
    const decimals = await erc20Decimals(provider, poolAddress);
    const rateDecimals = COMPPrecision + underlyingDecimals - decimals;
    const sharePrice = ExchangeRateBN / 10 ** rateDecimals;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCompoundV2Share;
