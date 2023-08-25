/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { POOLABI } = require('../../abi/DepositPool');
const { BNBXABI } = require('../../abi/BNBX');

async function checkstaderSharePrice(chain, poolAddress, investing_address) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const depositPool = new ethers.Contract(investing_address, POOLABI, provider);
    const BNBX = new ethers.Contract(poolAddress, BNBXABI, provider);

    const totalSupply = await BNBX.totalSupply();
    const totalAssets = await depositPool.getTotalPooledBnb();

    const sharePrice = totalAssets/totalSupply;

    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkstaderSharePrice;
