import { erc20Decimals } from '../../../../utils/ERC20Decimals';
import { getNodeProvider } from  '../../../../utils/getNodeProvider';
const pools = require('../pools/pools');
import getData from './functions/getData';
import getAPY from './functions/getAPY';


async function analytics(chain, poolAddress) {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = POOLS.find((elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });
  
    //Get data from blockchain
    const resultInfo = await getData(chain, poolAddress);
    if (resultInfo.err)
      throw new Error(`Data from Sentiment indexer not ok for ${poolAddress}`);
    const info = resultInfo.data;

     //Get data from the API
     const resultAPI= await getAPY(chain, poolAddress);
     if (resultAPI.err)
       throw new Error(`Data from Sentiment indexer not ok for ${poolAddress}`);
     const data = resultAPI.data;
   
  
    const result = {
      status: true,
      tvl: info.TVL,
      liquidity: info.liquidity,
      outloans: info.outloans,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: data.supplyAPY,
      activity_apy: data.supplyAPY,
      rewards_apy: 0,
      boosting_apy: null,
      share_price: info.sharePrice,
      minimum_deposit: null,
      maximum_deposit: null,
    };
  
    console.log(result);
  
    return result;
  }
  
  export default {
    main: analytics,
    url: 'https://arbitrum.sentiment.xyz/earn',
  };