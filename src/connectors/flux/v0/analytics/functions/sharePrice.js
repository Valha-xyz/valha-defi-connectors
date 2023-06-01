/* eslint-disable @typescript-eslint/no-var-requires */
import { PoolABI } from '../../abi/Pool';
import { ethers } from 'ethers';
import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkFluxLendingShare(chain, poolAddress, underlyingDecimals) {
  try {
    const COMPPrecision = 18;
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
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

module.exports = checkFluxLendingShare;
