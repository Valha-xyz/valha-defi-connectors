/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { PoolABI } = require('../../abi/Pool');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

const _ = require('lodash');
const pools = require('../../pools/pools');

async function getAuraSharePrice(chain, poolAddress) {
  try {

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const underlyingToken = poolInfo.underlying_tokens[0];


    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const SupplyBN = await POOL.totalSupply();
    const poolDecimals = await erc20Decimals(provider, poolAddress);

    const AssetsBN = await POOL.totalAssets();
    const underlyingDecimals = await erc20Decimals(provider, underlyingToken);
    
    const sharePrice = (AssetsBN / (10 ** underlyingDecimals)) / (SupplyBN / 10 ** poolDecimals);
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getAuraSharePrice;
