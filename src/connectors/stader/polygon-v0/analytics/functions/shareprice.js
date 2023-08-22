/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { POOLABI } = require('../../abi/DepositPool');
const { DataABI } = require('../../abi/Data');

async function checkstaderSharePrice(chain, poolAddress, investing_address) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const depositPool = new ethers.Contract(investing_address, POOLABI, provider);
    const data = await depositPool.getContracts()
    const dataPool = new ethers.Contract(data[0], DataABI, provider);

    const sharePrice = await dataPool.getRate() / 10 ** 18
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkstaderSharePrice;
