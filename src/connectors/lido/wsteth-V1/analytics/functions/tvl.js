/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { STETHABI } = require('src/connectors/lido/wsteth-V1/abi/STETH');
const { getUSDETH } = require('../../../../../utils/prices/getUSDETH');

async function checkLidoV0TVL(poolAddress) {
  try {
    const provider = getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    stethAddress= "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
    const POOL = new ethers.Contract(stethAddress, STETHABI, provider);
    const SupplyBN= await POOL.totalSupply();
    const decimals = await POOL.decimals();
    const Supply = SupplyBN/(10**decimals);

    
    const { data, err } = await getUSDETH();
    if (err) throw new Error(err.message);

    const TVL = Supply * data ;
    
    return { data: TVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkLidoV0TVL;
