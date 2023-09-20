/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkAngleV1APYTVL(chain, stakingAddress) {
  try {
    const { data } = await axios.get('https://api.angle.money/v1/incentives');
    if (!data[stakingAddress]) {
      throw new Error(`Data from Angle indexer not ok for ${stakingAddress}`);
    }
    const aprInfo = data[stakingAddress].apr;
    const activity_apy = aprInfo.details.fees + aprInfo.details.interests;
    const rewards_apy = aprInfo.details.min;
    const tvl = data[stakingAddress].tvl;
    return {
      data: {
        activity_apy: parseFloat(String(activity_apy)) ? activity_apy : 0,
        rewards_apy: parseFloat(String(rewards_apy)) > 0 ? rewards_apy : 0,
        tvl: parseFloat(String(tvl)) > 0 ? parseFloat(String(tvl)) : 0,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAngleV1APYTVL;
