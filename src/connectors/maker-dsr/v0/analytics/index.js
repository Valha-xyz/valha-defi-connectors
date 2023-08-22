

const { PoolABI } = require('../abi/Pool');
const { PotABI } = require('../abi/Pot');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const ethers = require('ethers');
const POT_ADDRESS = '0x197e90f9fad81970ba7976f33cbd77088e5d7cf7'
const RAY_PRECISION = 27;
const RAY = 10 ** RAY_PRECISION;

async function getAPY(chain) {
  try {
  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const POT = new ethers.Contract(POT_ADDRESS, PotABI, provider);
  
  const dsr = await POT.dsr();
  const activity_apy = (dsr/RAY) ** (60 * 60 * 24 * 365) - 1;

  return {data: activity_apy, err: null };
} catch (err) {
  console.log(err);
  return { data: null, err };
}
}

// async function getTotalAssets(POOL) {
//   const decimals = await POOL.decimals();
//   const TotalAssets = await POOL.totalAssets();
//   return TotalAssets / 10 ** decimals;
// }

async function getSharePrice(poolAddress,chain) {
  try {
  
  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const POOL = new ethers.Contract(poolAddress, PoolABI, provider);

  const TotalAssets = await POOL.totalAssets();
  const TotalSupply = await POOL.totalSupply();
  return { data: TotalAssets / TotalSupply, err: null };
} catch (err) {
  console.log(err);
  return { data: null, err };
}
}

async function getTVL(chain) {
  try {

  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const POT = new ethers.Contract(POT_ADDRESS, PotABI, provider);

  const Pie = await POT.Pie();
  const chi = await POT.chi();
  const tvlUsd = Pie * chi / (1e18 * RAY);
  return { data: tvlUsd, err: null };
} catch (err) {
  console.log(err);
  return { data: null, err };
}
}


async function analytics(chain, poolAddress) {
  try {
  
  const TVL = await getTVL(chain);
  if (TVL.err) throw new Error(TVL.err);
  const activity_apy = await getAPY(chain);
  if (activity_apy.err) throw new Error(activity_apy.err);
  const sharePrice = await getSharePrice(poolAddress,chain);
  if (sharePrice.err) throw new Error(sharePrice.err);

  const result = {
    status: true,
    tvl: TVL.data,
    liquidity: TVL.data,
    outloans: null,
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: activity_apy.data,
    activity_apy: activity_apy.data,
    rewards_apy: 0,
    boosting_apy: 0,
    share_price: sharePrice.data,
    minimum_deposit: null,
    maximum_deposit: null,
  };
  console.log(result)
  return result
} catch (err) {
  console.log(err);
  return {};
}
}


module.exports = {
  main: analytics,
  url: 'https://summer.fi/earn/dsr/',
};