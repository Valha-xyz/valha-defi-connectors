/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LP } = require('../../abi/LP');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

async function checkStargateV0SharePrice(chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, LP, provider);

    const SupplyBN = await POOL.totalSupply();
    const decimals = await POOL.decimals();
    const AssetsBN = await POOL.totalLiquidity();
    const token = await POOL.token();
    const decimalsUnderlying = await erc20Decimals(provider, token);



    const supply = SupplyBN / 10 ** decimals;
    const assets = AssetsBN / 10 ** decimalsUnderlying;
    const sharePrice = assets / supply;
    return { data: sharePrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkStargateV0SharePrice;
