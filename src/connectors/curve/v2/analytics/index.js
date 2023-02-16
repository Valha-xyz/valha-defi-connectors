/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const { erc20Decimals } = require('src/utils/ERC20Decimals');
const { getNodeProvider } = require('src/utils/getNodeProvider');
const pools = require('../pools/pools');
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

  //Get daily activity APY
  const 

  
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
    boosting_apy: null,
    share_price: sharePrice,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  // console.log(result);

  // return result;
}

module.exports = {
  main: analytics,
  url: 'https://curve.fi/#/ethereum/pools',
};

analytics('ethereum', '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490');
