/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { WSTETHABI } = require('src/connectors/lido/wsteth-V1/abi/WSTETH');

async function checkLidoV0SharePrice(poolAddress) {
  try {
    const provider = getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, WSTETHABI, provider);
    const sharePriceBN= await POOL.stEthPerToken();
    const decimals = await POOL.decimals();
    const sharePrice = sharePriceBN/(10**decimals);
    
    
    
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkLidoV0SharePrice;
