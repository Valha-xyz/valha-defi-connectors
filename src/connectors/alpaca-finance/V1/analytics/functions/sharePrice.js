/* eslint-disable @typescript-eslint/no-var-requires */
import VaultABI from '../../abi/Vault.json';
import { ethers } from 'ethers';
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkAlpacaV1Share(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, VaultABI, provider);
    const TotalSupplyBN = await POOL.totalSupply();
    const TotalTokenBN = await POOL.totalToken();
    const precision = 10 ** 6;
    const precisionBN = ethers.BigNumber.from(precision);
    const TotalTokenWithPrecision = precisionBN.mul(TotalTokenBN);
    const SharePriceBN = TotalTokenWithPrecision.div(TotalSupplyBN);
    const sharePrice = SharePriceBN.toString() / precision;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkAlpacaV1Share;
