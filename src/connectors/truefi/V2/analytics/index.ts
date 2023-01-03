import _ from 'lodash';
import { apy, url } from './external/DefiLlama/index';
import { checkTruefiV2Share } from './functions/sharePrice';
import { checkTruefiV2Liquidity } from './functions/liquidity';
import { checkTruefiV2Outloans } from './functions/outloans';
import { checkTruefiV2Status } from './functions/status';
import pools from '../pools';
import { checkTruefiV2TVL } from './functions/tvl';

/// APY
/// TVL
async function loadExternal(): Promise<any> {
  const pools = await apy();
  if (!pools || pools.length === 0) {
    return null;
  }
  return pools;
}

async function analytics(chain: string, poolAddress: string): Promise<any> {
  const POOLS = await pools();
  if (!POOLS || POOLS.length === 0) return;
  const externalInformation = await loadExternal();
  if (!externalInformation) return;
  const externalInfo = _.find(externalInformation, (elem) => {
    return elem.pool.includes(poolAddress.toLowerCase());
  });

  const activity_apy = externalInfo['apyBase'];
  const rewards_apy = externalInfo['apyReward'];
  const tvl = await checkTruefiV2TVL(chain, poolAddress);
  const sharePrice = await checkTruefiV2Share(chain, poolAddress);
  const liquidity = await checkTruefiV2Liquidity(chain, poolAddress);
  const outloans = await checkTruefiV2Outloans(chain, poolAddress);
  const status = await checkTruefiV2Status(chain, poolAddress);

  const result = {
    status: status.data,
    tvl: parseFloat(String(tvl.data)),
    liquidity: parseFloat(String(liquidity.data)),
    outloans: parseFloat(String(outloans.data)),
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: parseFloat(String(activity_apy)) + parseFloat(String(rewards_apy)),
    activity_apy: parseFloat(String(activity_apy)),
    rewards_apy: parseFloat(String(rewards_apy)),
    boosting_apy: null,
    share_price: parseFloat(String(sharePrice.data)),
    minimum_deposit: null,
    maximum_deposit: null,
  };

  console.log(result);
  return result;
}

export default {
  main: analytics,
  url: url,
};
