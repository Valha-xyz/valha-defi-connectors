/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LP } = require('../../abi/LP');
const { ROUTERABI } = require('../../abi/Router');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const pools = require('../../pools/pools');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
const _ = require('lodash');
const axios = require ('axios');


const BASE_URL = 'https://coins.llama.fi/prices/current/'

async function checkSynapseV0TVL(chain, poolAddress) {
  try {

    //Settle provider to call onchain data
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');

    // import tokens
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const underlyingTokens = poolInfo.underlying_tokens;
    const investingAddress = poolInfo.investing_address;
    const mainPool = new ethers.Contract(investingAddress, ROUTERABI, provider);

    let tvlUsd = 0;
    for (const underlyingToken of underlyingTokens) {

      // price in USD of underlying 
      // const info = await getGeckoTokenPrice(chain,underlyingToken);
      // if (info.err) throw new Error(info.err.message);
      

      const URL = BASE_URL + chain + ':' + underlyingToken
      const info = await axios.get(URL);
      const underlyingPrice = info.data.coins[chain + ':' + underlyingToken].price;

      // balance of underlying (scaled with correct decimals)
      
      const indexToken = await mainPool.getTokenIndex(underlyingToken);
      const balanceTokenBN = await mainPool.getTokenBalance(indexToken);

      const decimalToken = await erc20Decimals(provider, underlyingToken);
      const balanceToken = balanceTokenBN / (10 ** decimalToken);

      tvlUsd = tvlUsd + (balanceToken*underlyingPrice);
  }; 

  
    return { data: tvlUsd, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkSynapseV0TVL;
