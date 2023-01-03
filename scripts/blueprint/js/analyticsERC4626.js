/* 
    DOCUMENTATION EXAMPLE to give more context about the integration work.
    
    Definitely need more testing and improvement.

    --> A CLI script will be developed to automatically generate ERC4626 connector
*/

const ERC4626ABI = require('../abi/ERC4626.json');
const { getNodeProvider } = require('src/utils/getNodeProvider');
const ethers = require('ethers');

async function getStatus(chain, pool_address) {
  return true;
}

async function getAPY(chain, pool_address) {
  const activity_apy = 2.5;
  const rewards_apy = 2.5;
  return { activity_apy: activity_apy, rewards_apy: rewards_apy };
}

async function getTotalAssets(POOL) {
  const decimals = await POOL.decimals();
  const TotalAssets = await POOL.totalAssets();
  return TotalAssets / 10 ** decimals;
}

async function getSharePrice(POOL) {
  const TotalAssets = await POOL.totalAssets();
  const TotalSupply = await POOL.totalSupply();
  return TotalAssets / TotalSupply;
}

async function analytics(chain, poolAddress) {
  const provider = await getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const POOL = new ethers.Contract(poolAddress, ERC4626ABI, provider);
  const TVL = await getTotalAssets(POOL);
  const status = await getStatus(POOL);
  const { activity_apy, rewards_apy } = await getAPY(chain, poolAddress);
  const sharePrice = await getSharePrice(chain, poolAddress);

  const result = {
    status: status,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: 10_000_000,
    apy: activity_apy + rewards_apy,
    activity_apy: activity_apy,
    rewards_apy: rewards_apy,
    boosting_apy: 0,
    share_price: sharePrice,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://app.test.xyz',
};
