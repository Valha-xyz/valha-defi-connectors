/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const {queryGraphData, getBlocksByTime} = require ('./external/graphQuery');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const pools = require('../../pools/pools');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
import { SUBGRAPH_URLS, GAUGE_URLS} from './external/graphQuery'




async function checkBalancerV2SharePrice(chain, poolAddress) {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};

    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const underlying_tokens = poolInfo.underlying_tokens;

    const currentTimestamp = Math.floor(Date.now() / 1000) - 100;

    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const currentBlock = await getBlocksByTime(currentTimestamp,chain);
    const query = await queryGraphData(SUBGRAPH_URL,poolAddress,currentBlock);
    

    // We get the current pool inside this big array
    const TVL = Number(query[0].reserveUSD);
    const TVL0 = 2 * Number(query[0].reserve0);
    const TVL1 = 2 * Number(query[0].reserve1);


    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');

    const poolToken = new ethers.Contract(poolAddress, ERC20ABI, provider);
    const supplyBN = await poolToken.totalSupply();
    const decimalsBN = await poolToken.decimals();
    const supply = supplyBN / 10 ** decimalsBN;


    

    const share_price = { sharePriceUSD: TVL/supply, sharePriceToken0: TVL0/supply, sharePriceToken1 :TVL1/supply }




    return { data: share_price, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkBalancerV2SharePrice;
