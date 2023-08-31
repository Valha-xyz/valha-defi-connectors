/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { PoolABI } = require('../../abi/Pool');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

const checkBalancerV2TVL = require('../../../../balancer/v2/analytics/functions/tvl');

const pools = require('../../../../aura/v0/pools/pools');
const _ = require('lodash');

const axios = require('axios');

async function getAuraPoolTVL(chain, poolAddress, AuraID) {
  try {
    //Find TVL thanks to LP Token
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const underlyingToken = poolInfo.underlying_tokens[0];

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);

    const AssetsBN = await POOL.totalAssets();
    const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
    
    const start_URL = "https://coins.llama.fi/prices/current/";
    const key = chain + ":" + underlyingToken;
    const URL = start_URL + key;

    const response = await axios.get(URL);
    const priceUnderlying = response.data.coins[key].price;

    const tvlUsd = (AssetsBN / (10 ** underlyingDecimals)) * priceUnderlying;

    // get underlying tvl for capacity

    const info = await checkBalancerV2TVL(chain, underlyingToken);
    if (info.err || !info.data)
      throw new Error(`Data from Aura indexer not ok for ${poolAddress}`);
    return { data: {tvlPool: tvlUsd, tvlUnderlying: info.data} , err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err.message };
  }
}

module.exports = getAuraPoolTVL;
