import {
  type Analytics,
  type AnalyticsExport,
} from '../../../../utils/types/connector-types';
import { getVaults } from '../pools/updatePools';
import pools from '../pools/pools';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../utils/getNodeProvider';
import { ROUTERABI } from '../abi/Router';
import { POOLABI } from '../abi/Pool';
import { getGeckoTokenPrice } from '../../../../utils/prices/getGeckoTokenPrice'

/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');

async function analytics(
  chain,
  poolAddress,
): Promise<Analytics | Record<never, never>> {
  try {

    const POOLS2 = await pools()
    if (!POOLS2 || POOLS2.length === 0) return {}
    const currentPool2 = POOLS2.find((pool) => pool.pool_address == poolAddress);


    const POOLS = await getVaults(chain);
    const currentPool = POOLS.find((pool) => pool.address == poolAddress);

    //  price token

    const { data, err } = await getGeckoTokenPrice(chain,currentPool2.underlying_tokens[0]);

    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(currentPool2.investing_address,ROUTERABI,provider);

    const generalData = await POOL.getReserveData(currentPool2.underlying_tokens[0]);
    const formattedApy =  generalData[2] / 10 ** 27;

    const TOKEN = new ethers.Contract(poolAddress,POOLABI,provider);
    const tvl = data * TOKEN.totalSupply();


    if (!POOLS || POOLS.length === 0) return {};

    // const tvl = currentPool.tvl;
    const outloans = currentPool.totalBorrowUsd;
    const liquidity = tvl - outloans;
    // const apy = currentPool.base * 100;

    const result = {
      status: currentPool.active,
      tvl,
      liquidity,
      outloans,
      losses: null,
      capacity: liquidity,
      apy: formattedApy,
      activity_apy: formattedApy,
      rewards_apy: 0, // No rewards on deposit pools
      boosting_apy: 0,
      share_price: 1,
      minimum_deposit: null,
      maximum_deposit: null,
    };
    console.log(result);
    return result;
    
  } catch (err) {
    console.log(err);
    return null;
  }
}

const analyticsExport: AnalyticsExport = {
  main: analytics,
  url: 'https://app.aave.com/',
};
export default analyticsExport;
