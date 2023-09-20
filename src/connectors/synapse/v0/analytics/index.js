/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const checkSynapseV0TVL = require('./functions/tvl');
const checkSynapseV0RewardsAPY = require('./functions/apy');
const checkSynapseV0SharePrice = require('./functions/sharePrice');


async function analytics(chain, poolAddress) {
  let result = {};
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const tvlInfo = await checkSynapseV0TVL(chain, poolAddress);
  if (tvlInfo.err) throw new Error(tvlInfo.err);
  const tvl = tvlInfo.data;
  const shareInfo = await checkSynapseV0SharePrice(chain, poolAddress, tvl);
  if (shareInfo.err) throw new Error(shareInfo.err);
  const sharePrice = shareInfo.data;

  // FIND APY
  
  const apyInfo = await checkSynapseV0RewardsAPY(chain,poolAddress,tvl);
    if (apyInfo.err) throw new Error(apyInfo.err);
    const RewAPY = apyInfo.data;


    result = {
      status: null,
      tvl: tvl,
      liquidity: tvl,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: RewAPY,
      activity_apy: 0,
      rewards_apy: RewAPY,
      boosting_apy: null,
      share_price: sharePrice,
      minimum_deposit: null,
      maximum_deposit: null,
    };
  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: "https://www.synapseprotocol.com/pools",
};
