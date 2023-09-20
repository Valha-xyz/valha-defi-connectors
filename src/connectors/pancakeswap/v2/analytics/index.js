/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const external = require('./external/DefiLlama/index');
const checkPancakeV2SharePrice = require('./external/sharePrice');
const getVolume = require('./external/getVolume');

/// APY
/// TVL
async function loadExternal() {
  const pools = await external.apy();
  if (!pools || pools.length === 0) {
    return null;
  }

  return pools;
}

async function analytics(chain, poolAddress) {
  const externalInformation = await loadExternal();
  if (!externalInformation) return {};
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.pool.toLowerCase().includes(poolAddress.toLowerCase());
  });


  const sharePrice = await checkPancakeV2SharePrice(chain, poolAddress);
  if (sharePrice.err) throw new Error(sharePrice.err);
  const sharePriceUSD = sharePrice.data.sharePriceUSD;
  const shareToken0 = sharePrice.data.sharePriceToken0;
  const shareToken1 = sharePrice.data.sharePriceToken1;

  if (!externalInfo) return {};

  const tvl = externalInfo.tvlUsd;
  const rewardsAPY = externalInfo.apyReward;
  const activityAPY = externalInfo.apyBase;
  const totalAPY = rewardsAPY + activityAPY;


  // const Volume = await getVolume(chain, poolAddress);
  // if (Volume.err) throw new Error(Volume.err)
  // const extraInfo = Volume.data


  const result = {
    status: true,
    tvl: tvl || null,
    liquidity: tvl,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: activityAPY || 0,
    rewards_apy: rewardsAPY || 0,
    boosting_apy: 0,
    share_price: shareToken0,
    minimum_deposit: null,
    maximum_deposit: null,
    volume: 0, // extraInfo.volume,
    fee: 0 //extraInfo.fee
  };
  console.log(result);
  return result;
}

module.exports = {
  main: analytics,
  url: external.url,
};
