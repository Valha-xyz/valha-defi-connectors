/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const {
  getGeckoTokenPrice,
} = require('../../../../utils/prices/getGeckoTokenPrice');
const checkCompoundV2TVL = require('./functions/tvl');
const checkCompoundV2Liquidity = require('./functions/liquidity');
const checkCompoundV2Outloans = require('./functions/outloans');
const checkCompoundV2Share = require('./functions/sharePrice');
const checkSonneV0ActivityAPY = require('./functions/apyActivity');
const checkSonneV0RewardsAPY = require('./functions/apyRewards');

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

  // Find information about reward token price
  const rewardToken = poolInfo.rewards_tokens[0];
  const resultReward = await getGeckoTokenPrice(chain, rewardToken);
  if (resultReward.err) throw new Error(resultReward.err.message);
  const rewardUSDPrice = resultReward.data;
  const comptrollerAddress = poolInfo.distributor_address;
  const rewardDecimals = await erc20Decimals(provider, rewardToken);

  // Find information on Compound API.
  const ActAPYResult = await checkSonneV0ActivityAPY(chain, poolAddress);
  const ActAPY = ActAPYResult.data;
  const RewAPYResult = await checkSonneV0RewardsAPY(
    chain,
    comptrollerAddress,
    rewardDecimals,
    rewardUSDPrice,
    TVL,
    poolAddress
  );
  const RewAPY = RewAPYResult.data;
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

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://sonne.finance/',
};
