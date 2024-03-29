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
import { getGeckoTokenPrice } from '../../../../utils/prices/getGeckoTokenPrice';
import { erc20Decimals } from '../../../../utils/ERC20Decimals';
import { erc20BalanceOf } from '../../../../utils/ERC20BalanceOf';

/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');

async function analytics(
  chain,
  poolAddress
): Promise<Analytics | Record<never, never>> {
  try {
    const POOLS2 = await pools();
    if (!POOLS2 || POOLS2.length === 0) return {};
    const currentPool2 = POOLS2.find(
      (pool) => pool.pool_address == poolAddress
    );

    const POOLS = await getVaults(chain);

    console.log(POOLS);
    const currentPool = POOLS.find((pool) => pool.address == poolAddress);

    //  price token

    const { data, err } = await getGeckoTokenPrice(
      chain,
      currentPool2.underlying_tokens[0]
    );

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(
      currentPool2.investing_address,
      ROUTERABI,
      provider
    );

    const generalData = await POOL.getReserveData(
      currentPool2.underlying_tokens[0]
    );
    const formattedApy = Number(generalData[2]) / 10 ** 27;

    const underlyingSupply = await erc20BalanceOf(
      provider,
      currentPool2.underlying_tokens[0],
      poolAddress
    );
    const underlyingDecimals = await erc20Decimals(
      provider,
      currentPool2.underlying_tokens[0]
    );

    console.log(underlyingSupply);
    console.log(underlyingDecimals);

    const TOKEN = new ethers.Contract(poolAddress, POOLABI, provider);
    const totalSupply = await TOKEN.totalSupply();
    const decimals = await TOKEN.decimals();

    const tvl = (data * totalSupply) / 10 ** decimals;
    const liquidity = (data * underlyingSupply) / 10 ** underlyingDecimals;
    const outloans = tvl - liquidity;

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
  url: 'https://app.sturdy.finance/markets',
};
export default analyticsExport;
