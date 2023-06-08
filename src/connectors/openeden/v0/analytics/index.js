const { ERC4626ABI } = require('../abi/ERC4626');
const { VaultABI } = require('../abi/Vault');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const ethers = require('ethers');
const axios = require('axios');

async function getAPY(chain, pool_address) {
  const res = await axios.get('https://api.openeden.com/vault/positions');
  try {
    const activity_apy = res.data.portfolioYTM * 100;
    return { activity_apy };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

async function getMinMax(POOL, chain) {
  const decimals =  await POOL.decimals();
  // const TotalAssets = await POOL.totalAssets();
  const vault = await POOL._baseVault();
  const provider = getNodeProvider(chain);
  const MINMAX = new ethers.Contract(vault, VaultABI, provider);
  const total = await MINMAX.getMinMaxDeposit() ;
  const min = total[0].toNumber()/ (10 ** decimals);
  return {
    minimum: min
  };
}

async function getTotalAssets(POOL) {
  const decimals = await POOL.decimals();
  // const TotalAssets = await POOL.totalAssets();
  const TotalSupply = await POOL.totalSupply();
  const AssetsAvailable = await POOL.assetsAvailable();
  return {
    TVL: AssetsAvailable / 10 ** decimals,
    SharePrice: AssetsAvailable / TotalSupply,
  };
}

async function analytics(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, ERC4626ABI, provider);
    const data = await getTotalAssets(POOL);
    const TVL = data.TVL;
    const sharePrice = data.SharePrice;
    const activity_apy = await getAPY(chain, poolAddress);
    const minmax = await getMinMax(POOL, chain);

    const result = {
      status: null,
      tvl: TVL,
      liquidity: TVL,
      outloans: null,
      losses: null,
      capacity: null,
      apy: activity_apy.activity_apy,
      activity_apy: activity_apy.activity_apy,
      rewards_apy: 0,
      boosting_apy: 0,
      share_price: sharePrice,
      minimum_deposit: minmax.minimum,
      maximum_deposit: null,
    };
    return result;
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = {
  main: analytics,
  url: 'https://openeden.com/',
};
