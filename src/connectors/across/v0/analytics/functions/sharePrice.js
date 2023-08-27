/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const axios = require ('axios');
const _ = require('lodash');
const pools = require('../../pools/pools');

const BASE_URL = 'https://across.to/api/pools?token=<IDHOLDER>'

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

    const poolTokenDecimals  = await erc20Decimals(provider, poolAddress);

    
    const URL = BASE_URL.replace('<IDHOLDER>',poolInfo.underlying_tokens[0])
    const result = await axios.get(URL);
    const exchangeRateCurrent = Number(result.data.exchangeRateCurrent)/(10 ** poolTokenDecimals);
    

 
    return { data: exchangeRateCurrent, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAcrossV0SharePrice;
