/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const {
  getGeckoTokenPrice,
} = require('../../../../utils/prices/getGeckoTokenPrice');
const checkCompoundv2Data = require('./functions/getData');
const checkCompoundV2TVL = require('./functions/tvl');
const checkCompoundV2Liquidity = require('./functions/liquidity');
const checkCompoundV2Outloans = require('./functions/outloans');
const checkCompoundV2Share = require('./functions/sharePrice');

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

  // Find information on Compound API.
  const info = await checkCompoundv2Data(chain, poolAddress);
  const ActAPY = info['supply_rate'] ? info['supply_rate'].value * 100 : 0;
  const RewAPY = info['comp_supply_apy']
    ? parseFloat(info['comp_supply_apy'].value)
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

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://v2-app.compound.finance/',
};
