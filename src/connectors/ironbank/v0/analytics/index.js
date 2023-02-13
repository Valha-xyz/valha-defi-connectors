const _ = require('lodash');
const checkIBData = require('./function/getIBData');

async function analytics(chain, poolAddress) {
  const info = await checkIBData(chain, poolAddress);
  console.log(info);

  const total
  const TVL = info['totalSupplyUsd'] ? info['totalSupplyUsd'] : 0;
  // const outloans = info['totalBorrowsUsd'] ? info['totalBorrowsUsd'] : 0;
  // const liquidity = TVL - outloans;
  // const sharePrice = info['exchangeRateHumanReadable']
  //   ? info['exchangeRateHumanReadable']
  //   : 0;
  // const ActAPY = info['supplyApy'] ? info['supplyApy'] : 0;
  // const RewAPY = 0;
  // const totalAPY = ActAPY + RewAPY;

  // const result = {
  //   status: true,
  //   tvl: TVL,
  //   liquidity: liquidity,
  //   outloans: outloans,
  //   losses: null,
  //   capacity: Number.MAX_SAFE_INTEGER,
  //   apy: totalAPY,
  //   activity_apy: ActAPY,
  //   rewards_apy: RewAPY,
  //   boosting_apy: null,
  //   share_price: sharePrice,
  //   minimum_deposit: null,
  //   maximum_deposit: null,
  // };

  // console.log(result);
  // return result;
}

// module.exports = {
//   main: analytics,
//   url: 'https://fluxfinance.com/',
// };

analytics('optimism', '0x04F0fd3CD03B17a3E5921c0170ca6dD3952841cA');
