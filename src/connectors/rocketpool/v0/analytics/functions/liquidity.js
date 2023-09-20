/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { POOLABI } = require('../../abi/DepositPool');

async function checkRocketV0Liquidity(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, POOLABI, provider);
    const liquidityBN = await POOL.getExcessBalance();
    const liquidity = liquidityBN.toString() / 10 ** 18;
    return { data: liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkRocketV0Liquidity;
