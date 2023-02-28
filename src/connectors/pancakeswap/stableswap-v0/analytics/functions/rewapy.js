/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { PoolTokenABI } = require('../../abi/SanToken');
const { StableABI } = require('../../abi/StableMaster');

async function checkPancakeReward(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const POOLManagerAddr = await POOL.poolManager();
    const StableMasterAddr = await POOL.stableMaster();
    const MASTER = new ethers.Contract(StableMasterAddr, StableABI, provider);
    const collatInfo = await MASTER.collateralMap(POOLManagerAddr);
    const SanRateBN = collatInfo.sanRate;
    const SanRate = SanRateBN.toString() / 10 ** 18;
    return { data: SanRate, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAngleV1Share;
