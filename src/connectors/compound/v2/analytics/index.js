/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const {
  getGeckoTokenPrice,
} = require('../../../../utils/prices/getGeckoTokenPrice');
const checkCompoundV2Data = require('./functions/getData');
const checkCompoundV2Rewards = require('./functions/getReward');
const checkCompoundV2TVL = require('./functions/tvl');
const checkCompoundV2Liquidity = require('./functions/liquidity');
const checkCompoundV2Outloans = require('./functions/outloans');
const checkCompoundV2Share = require('./functions/sharePrice');

const BLOCKS_PER_DAY = 86400 / 12;

const COMP = {
  decimals: 18,
  symbol: 'COMP',
  address: ['0xc00e94Cb662C3520282E6f5717214004A7f26888'],
};

// function calculateApy(rate, price=1, tvl=1) {
//   // supply rate per block * number of blocks per year
//   const BLOCK_TIME = 3;
//   const YEARLY_BLOCKS = (365 * 24 * 60 * 60) / BLOCK_TIME;
//   const apy = ((rate * YEARLY_BLOCKS * price) / tvl) * 100;
//   return apy;
// }

const calculateApy = (ratePerTimestamps) => {
  const blocksPerDay = BLOCKS_PER_DAY;
  const daysPerYear = 365;
  return (
    (Math.pow(ratePerTimestamps * blocksPerDay + 1, daysPerYear) - 1) * 100
  );
};

const calcRewardApy = (rewards, TVL, COMP_PRICE) => {
  return ((rewards * BLOCKS_PER_DAY * 365 * COMP_PRICE) / TVL) * 100;
};

async function analytics(chain, poolAddress) {
  // Find information about underlying token.
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const underlyingToken = poolInfo.underlying_tokens[0];
  if (!underlyingToken) {
    throw new Error('Error: no underlying found for Compound');
  }
  const provider = getNodeProvider(chain);
  const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
  if (underlyingDecimals === 0) {
    throw new Error('Error: Compound underlying decimals null.');
  }

  // Find information about token price
  const { data, err } = await getGeckoTokenPrice(chain, underlyingToken);
  if (err) throw new Error(err.message);
  const tokenPrice = data;

  // Find information on Pool contract.
  const sharePriceResult = await checkCompoundV2Share(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const sharePrice = sharePriceResult.data;
  const TVLNative = await checkCompoundV2TVL(chain, poolAddress);
  const TVL = TVLNative.data * sharePrice * tokenPrice;
  const OutloansNative = await checkCompoundV2Outloans(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Outloans = OutloansNative.data * tokenPrice;
  const LiquidityNative = await checkCompoundV2Liquidity(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Liquidity = LiquidityNative.data * tokenPrice;

  // Find information on Compound API.

  const info = await checkCompoundV2Data(chain, poolAddress);
  const ActAPY = info.data.apyBase ? calculateApy(info.data.apyBase) : 0;

  // Find information about VXS Price
  const { price2, err2 } = await getGeckoTokenPrice(chain, COMP.address[0]);
  if (err2) throw new Error(err.message);
  const COMP_PRICE = price2 || 20; // Hardwrite asset price

  const reward = await checkCompoundV2Rewards(chain, poolAddress);
  const RewAPY = reward.data.apyRewards
    ? calcRewardApy(reward.data.apyRewards, TVL, COMP_PRICE)
    : 0;
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
  url: 'https://v2-app.compound.finance/',
};
