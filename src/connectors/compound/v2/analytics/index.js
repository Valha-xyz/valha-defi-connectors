/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('src/utils/ERC20Decimals');
const { getNodeProvider } = require('src/utils/getNodeProvider');
const { getGeckoTokenPrice } = require('src/utils/prices/getGeckoTokenPrice');
const checkCompoundv2Data = require('./functions/getData');

async function analytics(chain, poolAddress) {
  // Find information about underlying token.
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return {};
  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  const underlyingToken = poolinfo.underlying_tokens[0];
  if (!underlyingToken)
    throw new Error('Error: no underlying found for Compound');
  const provider = await getNodeProvider(chain);
  const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
  if (underlyingDecimals === 0)
    throw new Error('Error: Compound underlying decimals null.');

  // Find information about token price
  const { data, err } = await getGeckoTokenPrice(chain, underlyingToken);
  if (err) throw new Error(err.message);
  const tokenPrice = data;

  // Find information on Pool contract.
  const sharePrice = await checkCompoundV2Share(chain, poolAddress);
  const TVL = await checkShare(chain, poolAddress);
  const Outloans = await checkShare(chain, poolAddress);
  const Liquidity = await checkShare(chain, poolAddress);

  // Find information on Compound API.
  const info = await checkCompoundv2Data(chain, poolAddress);
  console.log(info);
  const ActAPY = 0;
  const RewAPY = 0;
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
