/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const getData = require('./functions/getData');

async function analytics(chain, poolAddress) {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });

  //Get data from the API
  const info = await getData(chain, poolAddress, poolInfo.metadata.id);
  console.log(info);

  // const sharePrice

  // //SHAREPRICE
  // const ActAPY = dataAPY ? dataAPY.activity_apy : 0;
  // const RewAPY = dataAPY ? dataAPY.rewards_apy : 0;
  // const totalAPY = ActAPY + RewAPY;
  // const TVL = dataAPY ? dataAPY.tvl : 0;

  // const result = {
  //   status: null,
  //   tvl: TVL,
  //   liquidity: TVL,
  //   outloans: null,
  //   losses: null,
  //   capacity: Number.MAX_SAFE_INTEGER,
  //   apy: totalAPY,
  //   activity_apy: ActAPY,
  //   rewards_apy: RewAPY,
  //   boosting_apy: null,
  //   share_price: sharePrice.data,
  //   minimum_deposit: null,
  //   maximum_deposit: null,
  // };

  // console.log(result);

  // return result;
}

module.exports = {
  main: analytics,
  url: 'https://curve.fi/#/ethereum/pools',
};

analytics('ethereum', '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490');
