/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { sFRXETHABI } = require('../../abi/sFRXETH');

async function checkFraxSharePrice(chain, poolAddress, stakingAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const sFRXETH = new ethers.Contract(stakingAddress, sFRXETHABI, provider);
    const totalAssets = await sFRXETH.totalAssets() / 10 ** 18;
    const totalSupply = await sFRXETH.totalSupply() / 10 ** 18;
    
    const sharePrice = totalAssets/totalSupply;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkFraxSharePrice;
