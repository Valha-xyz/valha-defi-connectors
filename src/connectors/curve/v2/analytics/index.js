/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const pools = require('../pools/pools');
const getActivityAPY = require('./functions/getActivityAPY');
const getData = require('./functions/getData');

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });

  //Get data from the API
  const resultInfo = await getData(chain, poolAddress, poolInfo.metadata.id);
  if (resultInfo.err)
    throw new Error(`Data from Curve V2 indexer not ok for ${poolAddress}`);
  const info = resultInfo.data;

  //Get Main Pool Info
  const provider = await getNodeProvider(chain);
  const decimals = await erc20Decimals(provider, poolInfo.pool_address);

  const TVL = info.usdTotal;
  const sharePrice = info.virtualPrice / 10 ** decimals;
  const RewAPY =
    info.gaugeCrvApy && info.gaugeCrvApy.length > 0 ? info.gaugeCrvApy[0] : 0;
  const BoostingAPY =
    info.gaugeCrvApy && info.gaugeCrvApy.length > 1 ? info.gaugeCrvApy[1] : 0;

  //Get daily activity APY
  const infoActAPY = await getActivityAPY(chain, poolInfo.investing_address);
  if (infoActAPY.err)
    throw new Error(`Data from Curve V2 indexer not ok for ${poolAddress}`);
  const ActAPY = infoActAPY.data;

  const totalAPY = ActAPY + RewAPY;

  const result = {
    status: true,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: totalAPY,
    activity_apy: ActAPY,
    rewards_apy: RewAPY,
    boosting_apy: BoostingAPY,
    share_price: sharePrice,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://curve.fi/#/ethereum/pools',
};
