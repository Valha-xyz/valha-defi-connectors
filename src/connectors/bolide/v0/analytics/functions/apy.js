/* eslint-disable @typescript-eslint/no-var-requires */

const axios = require ('axios');

const URL = 'https://bolide.fi/api/v1/vaults/list'

async function checkBolideAPY(chain,poolAddress) {
  try {
    const result = await axios.get(URL);
    
    const poolWithAddress = result.data.vaults.find(vault => vault.address === poolAddress);
    const boostingApy = poolWithAddress.boostingApy;
    const baseApy = poolWithAddress.baseApy;

    return { data: {activityApy: baseApy, rewardApy: boostingApy}, err: null };
    
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBolideAPY;
