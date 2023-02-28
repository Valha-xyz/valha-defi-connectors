const getInstadappInfo = require('./external/getInfo');
const getInstadappv2SharePrice = require('./external/shareprice');

async function analytics(chain, poolAddress) {
  const info = await getInstadappInfo(chain, poolAddress);
  if (info.err) throw new Error(info.err);
  const sharePriceInfo = await getInstadappv2SharePrice(chain, poolAddress);
  if (sharePriceInfo.err) throw new Error(sharePriceInfo.err);
  const sharePrice = sharePriceInfo.data;

  console.log(info.d);

  const result = {
    status: null,
    tvl: info.data['tvl'],
    liquidity: info.data['liquidity'],
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: info.data['activity_apy'],
    activity_apy: info.data['activity_apy'],
    rewards_apy: 0,
    boosting_apy: 0,
    share_price: sharePrice,
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
