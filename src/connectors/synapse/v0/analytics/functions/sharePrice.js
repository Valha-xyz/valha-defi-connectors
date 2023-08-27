/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LP } = require('../../abi/LP');
const { ROUTERABI } = require('../../abi/Router');
const pools = require('../../pools/pools');
const _ = require('lodash');


async function checkSynapseV0SharePrice(chain, poolAddress, tvl) {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const lpToken = new ethers.Contract(poolAddress, LP, provider);
    const mainPool = new ethers.Contract(poolInfo.investing_address, ROUTERABI, provider);
    const sharePriceBN = await mainPool.getVirtualPrice();
    const decimals = await lpToken.decimals();

 
    return { data: sharePriceBN / (10 ** decimals), err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkSynapseV0SharePrice;
