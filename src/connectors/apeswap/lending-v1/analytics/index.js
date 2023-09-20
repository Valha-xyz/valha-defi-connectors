/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const {getGeckoTokenPrice,} = require('../../../../utils/prices/getGeckoTokenPrice');
const checkApeswapData = require('./functions/getData');
const checkApeswapRewardsData = require('./functions/getReward');
const checkApeswapTVL = require('./functions/tvl');
const checkApeswapLiquidity = require('./functions/liquidity');
const checkApeswapOutloans = require('./functions/outloans');
const checkApeswapShare = require('./functions/sharePrice');

const BANANA = {
  decimals: 18,
  symbol: 'BANANA',
  address: ['0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'],
};


function calculateApy(rate, price = 1, tvl =1) {
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
    throw new Error('Error: no underlying found for Compound');
  const provider = getNodeProvider(chain);
  const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
  if (underlyingDecimals === 0)
    throw new Error('Error: Compound underlying decimals null.');

  // Find information about token price
  const { data, err } = await getGeckoTokenPrice(chain, underlyingToken);
  if (err) throw new Error(err.message);
  const tokenPrice = data;

  // Find information on Pool contract.
  const sharePriceResult = await checkApeswapShare(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const sharePrice = sharePriceResult.data;
  const TVLNative = await checkApeswapTVL(chain, poolAddress);
  const TVL = TVLNative.data * sharePrice * tokenPrice;
  const OutloansNative = await checkApeswapOutloans(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Outloans = OutloansNative.data * tokenPrice;
  const LiquidityNative = await checkApeswapLiquidity(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Liquidity = LiquidityNative.data * tokenPrice;

  // Find information on Apeswap contracts for APY.
  const info = await checkApeswapData(chain, poolAddress);
  const ActAPY = info.data.apyBase ? calculateApy(info.data.apyBase) : 0;

   // Find information about VXS Price
  const { price2, err2 } = await getGeckoTokenPrice(chain, BANANA.address[0]);
  if (err2) throw new Error(err.message);
  const BANANA_PRICE = price2 ? price2 : 0.03; // Hardwrite asset price

  const reward = await checkApeswapRewardsData(chain, poolAddress);

  const RewAPY = reward.data.apyRewards ? calculateApy(reward.data.apyRewards, BANANA_PRICE, TVL) : 0;
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
  url: 'https://lending.apeswap.finance/markets',
};
