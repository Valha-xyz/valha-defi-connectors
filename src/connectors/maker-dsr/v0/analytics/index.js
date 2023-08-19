

const ERC4626ABI = require('../abi/Pool');
const PotABI = require('../abi/Pot');
const { getNodeProvider } = require('src/utils/getNodeProvider');
const ethers = require('ethers');
const POT_ADDRESS = '0x197e90f9fad81970ba7976f33cbd77088e5d7cf7'
const RAY_PRECISION = 27;
const RAY = 10 ** RAY_PRECISION;


async function getStatus(chain, pool_address) {
  return true;
}

async function getAPY(POT) {
  const dsr = await POT.dsr();
  const activity_apy = (dsr/RAY) ** (60 * 60 * 24 * 365) - 1;
  const rewards_apy = 0;
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

async function getTVL(POT) {
  const Pie = await POT.Pie();
  const chi = await POT.chi();
  const tvlUsd = Pie * chi / (1e18 * RAY);
  return tvlUsd;
}


async function analytics(chain, poolAddress) {
  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const POOL = new ethers.Contract(poolAddress, ERC4626ABI, provider);
  console.log(POOL);
  if (!POOL) throw new Error('Pool was not found');
  const POT = new ethers.Contract(POT_ADDRESS, PotABI, provider);
  if (!POT) throw new Error('Pot was not found');
  const TVL = await getTVL(POT);
  const status = await getStatus(POOL);
  const { activity_apy, rewards_apy } = await getAPY(POT);
  const sharePrice = await getSharePrice(chain, poolAddress);

  const result = {
    status: status,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: 1e18,
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
  url: 'https://summer.fi/earn/dsr/',
};