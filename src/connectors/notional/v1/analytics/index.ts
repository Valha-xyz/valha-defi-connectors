import {
  type Analytics,
  type AnalyticsExport,
} from '../../../../utils/types/connector-types';
import { PoolABI } from '../abi/Pool';
import { getNodeProvider } from '../../../../utils/getNodeProvider';
import ERC20ABI from '../../../../utils/abi/ERC20.json';
import pools from '../pools/pools';
import { ethers } from 'ethers';

/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const axios = require('axios');
const URL = 'https://classic.notional.finance/.netlify/functions/yields';

async function analytics(
  chain,
  poolAddress,
): Promise<Analytics | Record<never, never>> {
  try {
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const poolToken = new ethers.Contract(poolAddress, PoolABI, provider);
    const underlyingToken = new ethers.Contract(
      poolInfo.underlying_tokens[0],
      ERC20ABI,
      provider,
    );

    const Pools = await axios.get(URL);
    const filteredPool = Pools.data.filter(
      (pool) => pool.pool === poolInfo.name,
    );

    // TVL & APY

    const tvlUsd = filteredPool[0].tvlUsd;
    const ActAPY = filteredPool[0].apyBase;
    const RewAPY = filteredPool[0].apyReward;

    // SharePrice

    const totalSupplyBN = await poolToken.totalSupply();
    const decimalsPoolToken = await poolToken.decimals();

    const totalAsset = await poolToken.getPresentValueUnderlyingDenominated();
    const decimalsUnderlyingToken = await underlyingToken.decimals();

    const share_price =
      totalAsset /
      10 ** decimalsUnderlyingToken /
      (totalSupplyBN / (10 * decimalsPoolToken));

    const result = {
      status: true,
      tvl: tvlUsd,
      liquidity: tvlUsd,
      outloans: null,
      losses: null,
      capacity: Number.MAX_SAFE_INTEGER,
      apy: ActAPY + RewAPY,
      activity_apy: ActAPY,
      rewards_apy: RewAPY,
      boosting_apy: 0,
      share_price: share_price,
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
