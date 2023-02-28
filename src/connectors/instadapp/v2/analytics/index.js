const getInstadappInfo = require('./external/getInfo');

async function analytics(chain, poolAddress) {
  const info = await getInstadappInfo(chain, poolAddress);
  if (info.err) throw new Error(info.err);
  const sharePriceInfo = await getSharePrice(chain, poolAddress);
  if (sharePriceInfo.err) throw new Error(sharePriceInfo.err);

  const result = {
    status: null,
    tvl: info[tvl],
    liquidity: info[liquidity],
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: info[activity_apy],
    activity_apy: info[activity_apy],
    rewards_apy: 0,
    boosting_apy: 0,
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://lite.instadapp.io/',
};

analytics('ethereum', '0xA0D3707c569ff8C87FA923d3823eC5D81c98Be78');
