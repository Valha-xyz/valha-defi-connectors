/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const pools = require('../pools/pools');
const checkLidoV0SharePrice = require('./functions/sharePrice');
const checkLidoV0Data = require('./functions/getData');



async function analytics(chain, poolAddress) {

  const data = await checkLidoV0Data(poolAddress);

  const tvl = data.data.tvl;
  const activity_apy = data.data.apr;


  const sharePrice = await checkLidoV0SharePrice(poolAddress);

  const result = {
    status: null,
    tvl,
    liquidity: 0,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: parseFloat(String(activity_apy)),
    activity_apy,
    rewards_apy: 0,
    boosting_apy: null,
    share_price: sharePrice.data,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: external.url,
};
