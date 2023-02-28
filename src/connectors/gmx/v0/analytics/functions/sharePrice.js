/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { GLPABI } = require('../../abi/GLP');
const checkGMXV0TVL = require('./tvl');

async function checkGMXV0Share(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const TVLInfo = await checkGMXV0TVL(chain, poolAddress);
    if (TVLInfo.err) throw new Error(TVLInfo.err);
    const TVL = TVLInfo.data;
    const GLP_DECIMALS = 18;
    const GLP = new ethers.Contract(poolAddress, GLPABI, provider);
    const SupplyBN = GLP.totalSupply();
    const sharePrice = TVL / (SupplyBN.toString() / 10 ** GLP_DECIMALS);
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkGMXV0Share;
