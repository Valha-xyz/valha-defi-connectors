const _ = require('lodash');
const checkIBData = require('./function/getIBData');

async function analytics(chain, poolAddress) {
  const info = await checkIBData(chain, poolAddress);

  console.log(info);
  const price = info.underlying_price?.value;
  const sharePrice = info['exchange_rate'] ? info['exchange_rate'].value : 0;
  const TVL = info['total_supply']
    ? info['total_supply'].value * sharePrice
    : 0;
  const outloans = info['total_borrows']
    ? info['total_borrows'].value * price
    : 0;
  const liquidity = info['cash'] ? info['cash'].value * price : 0;
  const capacity = info['collateral_cap']
    ? info['collateral_cap'].value * price
    : 0;
  const ActAPY = info['supply_apy'] ? info['supply_apy'].value * 100 : 0;
  const RewAPY = 0;
  const totalAPY = ActAPY + RewAPY;

  const result = {
    status: true,
    tvl: TVL,
    liquidity: liquidity,
    outloans: outloans,
    losses: null,
    capacity: capacity,
    apy: totalAPY,
    activity_apy: ActAPY,
    rewards_apy: RewAPY,
    boosting_apy: null,
    share_price: sharePrice,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);
  return result;
}

// module.exports = {
//   main: analytics,
//   url: 'https://fluxfinance.com/',
// };

analytics('optimism', '0x049E04bEE77cFfB055f733A138a2F204D3750283');
