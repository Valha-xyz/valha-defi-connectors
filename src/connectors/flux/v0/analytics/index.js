/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { getGeckoTokenPrice,} = require('../../../../utils/prices/getGeckoTokenPrice');
const checkFluxLendingData = require('./functions/getData');
const checkFluxRewardData = require('./functions/getReward');
const checkFluxLendingTVL = require('./functions/tvl');
const checkFluxLendingLiquidity = require('./functions/liquidity');
const checkFluxLendingOutloans = require('./functions/outloans');
const checkFluxLendingShare = require('./functions/sharePrice');

const BLOCKS_PER_DAY = 86400 / 12;

const calculateApy = (ratePerTimestamps) => {
  const blocksPerDay = BLOCKS_PER_DAY;
  const daysPerYear = 365;
  return (
    (Math.pow(ratePerTimestamps * blocksPerDay + 1, daysPerYear) - 1) * 100
  );
};

async function analytics(chain, poolAddress) {
  // Find information about underlying token.
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const underlyingToken = poolInfo.underlying_tokens[0];
  if (!underlyingToken)
    throw new Error('Error: no underlying found for Flux');
  const provider = getNodeProvider(chain);
  const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
  if (underlyingDecimals === 0)
    throw new Error('Error: Flux underlying decimals null.');

  // Find information about token price
  const { data, err } = await getGeckoTokenPrice(chain, underlyingToken);
  if (err) throw new Error(err.message);
  const tokenPrice = data;

  // Find information on Pool contract.
  const sharePriceResult = await checkFluxLendingShare(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const sharePrice = sharePriceResult.data;
  const TVLNative = await checkFluxLendingTVL(chain, poolAddress);
  const TVL = TVLNative.data * sharePrice * tokenPrice;
  const OutloansNative = await checkFluxLendingOutloans(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Outloans = OutloansNative.data * tokenPrice;
  const LiquidityNative = await checkFluxLendingLiquidity(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Liquidity = LiquidityNative.data * tokenPrice;

 
  const info = await checkFluxLendingData(chain, poolAddress);
  const ActAPY = info.data.apyBase ? calculateApy(info.data.apyBase) : 0;

  const reward = await checkFluxRewardData(chain, poolAddress);
  const RewAPY = reward.data.apyRewards ? reward.data.apyRewards : 0;
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
  url: 'https://fluxfinance.com/',
};
