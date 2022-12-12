/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('src/utils/getNodeProvider');
const ethers = require('ethers');
const LPTokenABI = require('../../abi/LP.json');

async function checkWombatV1APY(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    // const SupplyRate = await POOL.getSupplyRate();
    // const apy = (SupplyRate / 1e18) * 365.25 * 24 * 3600 * 100;
    const apy = 0;
    return { data: apy, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkWombatV1APY;
