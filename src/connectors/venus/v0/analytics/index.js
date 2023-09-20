/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { getGeckoTokenPrice,} = require('../../../../utils/prices/getGeckoTokenPrice');
const checkVenusLendingData = require('./functions/getData');
const checkVenusRewardData = require('./functions/getReward');
const checkVenusLendingTVL = require('./functions/tvl');
const checkVenusLendingLiquidity = require('./functions/liquidity');
const checkVenusLendingOutloans = require('./functions/outloans');
const checkVenusLendingShare = require('./functions/sharePrice');

const SECONDS_PER_DAY = 86400;
const XVS = {
  decimals: 18,
  symbol: 'XVS',
  address: ['0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63'],
};



function calculateApy(rate, price=1, tvl=1) {
  // supply rate per block * number of blocks per year
  const BLOCK_TIME = 3;
  const YEARLY_BLOCKS = (365 * 24 * 60 * 60) / BLOCK_TIME;
  const apy = ((rate * YEARLY_BLOCKS * price) / tvl) * 100;
  return apy;
}


async function analytics(chain, poolAddress) {
  // Find information about underlying token.
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const underlyingToken = poolInfo.underlying_tokens[0];
  if (!underlyingToken)
    throw new Error('Error: no underlying found for Venus');
  const provider = getNodeProvider(chain);
  const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
  if (underlyingDecimals === 0)
    throw new Error('Error: Venus underlying decimals null.');

  // Find information about token price
  const { data, err } = await getGeckoTokenPrice(chain, underlyingToken);
  if (err) throw new Error(err.message);
  const tokenPrice = data;

  // Find information on Pool contract.
  const sharePriceResult = await checkVenusLendingShare(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const sharePrice = sharePriceResult.data;
  const TVLNative = await checkVenusLendingTVL(chain, poolAddress);
  const TVL = TVLNative.data * sharePrice * tokenPrice;
  const OutloansNative = await checkVenusLendingOutloans(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Outloans = OutloansNative.data * tokenPrice;
  const LiquidityNative = await checkVenusLendingLiquidity(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Liquidity = LiquidityNative.data * tokenPrice;

 
  const info = await checkVenusLendingData(chain, poolAddress);
  const ActAPY = info.data.apyBase ? calculateApy(info.data.apyBase) : 0;

   // Find information about VXS Price
  const { price2, err2 } = await getGeckoTokenPrice(chain, XVS.address[0]);
  if (err2) throw new Error(err.message);
  const XVS_PRICE = price2 ? price2 : 4; // Hardwrite asset price
 


  const reward = await checkVenusRewardData(chain, poolAddress);
  console.log(calculateApy(reward.data.apyRewards, XVS_PRICE, TVL));
  const RewAPY = reward.data.apyRewards ? calculateApy(reward.data.apyRewards, XVS_PRICE, TVL) : 0;
  const totalAPY = ActAPY + RewAPY;

  

  const result = {
    status: null,
    tvl: TVL,
    liquidity: Liquidity,
    outloans: Outloans,
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

  console.log(result);

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://app.Venus.fi/markets',
};
