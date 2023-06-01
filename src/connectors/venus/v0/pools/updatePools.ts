/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import { type Pool } from '../../../../utils/types/connector-types';
import { Chain } from '../../../../utils/types/networks';
import { ethers } from 'ethers';
import { PoolABI } from '../abi/Pool';
import { RewardsABI } from '../abi/Rewards';
import { getNodeProvider } from '../../../../utils/getNodeProvider';
const path = require('path');

const chains = ['bsc'];
const unitroller = '0xfD36E2c2a6789Db23113685031d7F16329158384';
const rewards_tokens = '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63';

async function getMarkets(chain) {
  const provider = getNodeProvider(chain);
  const markets = new ethers.Contract(unitroller, RewardsABI, provider);
  return markets.getAllMarkets();
}

async function generatePools(): Promise<Pool | Record<never, never>> {
  const chain = chains[0];
  const pools = await getMarkets(chain);
  const provider = getNodeProvider(chain);

  console.log(pools);

  if (!pools || pools.length === 0) {
    return {};
  }

  const result = [];

  for (const pool of pools) {
    try {
      const POOL = new ethers.Contract(pool, PoolABI, provider);
      const underlying = await POOL.underlying();
      const name = await POOL.name();
      const poolInfo = {
        name,
        chain,
        underlying_tokens: [underlying],
        pool_address: pool,
        investing_address: pool,
        staking_address: null,
        boosting_address: null,
        distributor_address: unitroller,
        rewards_tokens: [rewards_tokens],
        metadata: {},
      };
      console.log(poolInfo);
      result.push(poolInfo);
    } catch (err) {
      // this try/catch enables to jump when you have an address that is not a pool inside the factory.
      console.log(err);
      continue;
    }
  }

  return result;
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, '/generatedPools.json');
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
