/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const _ = require('lodash');
const pools = require('../../pools/pools');
const { ROUTERABI } = require('../../abi/Router');
const { LP } = require('../../abi/LP');


async function checkAcrossV0SharePrice(chain, poolAddress) {
  try {

    //Settle provider to call onchain data
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');

    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const Pool = new ethers.Contract(poolAddress,LP,provider);
    const totalSupplyBN = await Pool.totalSupply();

    const Hub = new ethers.Contract(poolInfo.investing_address,ROUTERABI,provider);
    const reservesInfo = await Hub.pooledTokens(poolInfo.underlying_tokens[0]);


    // ExchangeRate := (liquidReserves + utilizedReserves - undistributedLpFees) / lpTokenSupply
    const exchangeRateCurrent = 
    (Number(reservesInfo.utilizedReserves) + Number(reservesInfo.liquidReserves) - Number(reservesInfo.undistributedLpFees))/(totalSupplyBN)

 
    return { data: exchangeRateCurrent, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAcrossV0SharePrice;
