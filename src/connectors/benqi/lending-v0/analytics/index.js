/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const pools = require('../pools/pools');
const { erc20Decimals } = require('../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { getGeckoTokenPrice,} = require('../../../../utils/prices/getGeckoTokenPrice');
const checkBenqiLendingData = require('./functions/getData');
const checkBenqiLendingTVL = require('./functions/tvl');
const checkBenqiLendingLiquidity = require('./functions/liquidity');
const checkBenqiLendingOutloans = require('./functions/outloans');
const checkBenqiLendingShare = require('./functions/sharePrice');

const SECONDS_PER_DAY = 86400;
const AVAX = {
  decimals: 18,
  symbol: 'AVAX',
  address: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'],
};
const QI = {
  decimals: 18,
  symbol: 'QI',
  address: ['0x8729438eb15e2c8b576fcc6aecda6a148776c0f5'],
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
    throw new Error('Error: no underlying found for Benqi');
  const provider = getNodeProvider(chain);
  const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
  if (underlyingDecimals === 0)
    throw new Error('Error: Benqi underlying decimals null.');

  // Find information about token price
  const { data, err } = await getGeckoTokenPrice(chain, underlyingToken);
  if (err) throw new Error(err.message);
  const tokenPrice = data;

  // Find information on Pool contract.
  const sharePriceResult = await checkBenqiLendingShare(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const sharePrice = sharePriceResult.data;
  const TVLNative = await checkBenqiLendingTVL(chain, poolAddress);
  const TVL = TVLNative.data * sharePrice * tokenPrice;
  const OutloansNative = await checkBenqiLendingOutloans(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Outloans = OutloansNative.data * tokenPrice;
  const LiquidityNative = await checkBenqiLendingLiquidity(
    chain,
    poolAddress,
    underlyingDecimals
  );
  const Liquidity = LiquidityNative.data * tokenPrice;

 
  const info = await checkBenqiLendingData(chain, poolAddress);
  const ActAPY = info.data.apyBase ? info.data.apyBase : 0;

   // Find information about QI and AVAX Price
   const { price2, err2 } = await getGeckoTokenPrice(chain, QI.address[0]);
   if (err2) throw new Error(err.message);
   const QI_PRICE = price2;

 
   const { price3, err3 } = await getGeckoTokenPrice(chain, AVAX.address[0]);
   if (err3) throw new Error(err.message);
   const AVAX_PRICE = price3;

  const qiApy = (((info.data.qiRewards / 10 ** QI.decimals) * SECONDS_PER_DAY * 365 * QI_PRICE) / TVL);
  const avaxApy = (((info.data.avaxRewards / 10 ** AVAX.decimals) * SECONDS_PER_DAY * 365 * AVAX_PRICE) / TVL);

  const RewAPY = qiApy + avaxApy;
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
  url: 'https://app.benqi.fi/markets',
};
