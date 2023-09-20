const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
const { GAUGEABI } = require('../abi/GAUGE');

async function STAKINGPID(chain, stakingAddress, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const Farm = new ethers.Contract(stakingAddress, GAUGEABI, provider);
    const PID = await Farm.vaultFarmId(poolAddress);
    return { data: PID, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = STAKINGPID;
