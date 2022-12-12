/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('src/utils/getNodeProvider');
const ethers = require('ethers');
const PoolTokenABI = require('../../abi/PoolToken.json');

async function checkClearpoolV1Status(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const Status = await POOL.state();
    return { data: Status, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkClearpoolV1Status;
