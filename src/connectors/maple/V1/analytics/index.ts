import _ from "lodash";
import { apy, url } from "./external/DefiLlama/index";
import pools from "../pools/pools";
import { checkMapleV3Liquidity } from "./functions/liquidity";
import { checkMapleV3Outloans } from "./functions/outloans";
import { checkMapleV3Status } from "./functions/status";
import { checkMapleV3TVL } from "./functions/tvl";

/// APY
/// TVL
async function loadExternal() {
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

  console.log(externalInfo);
  console.log("----------");

  const poolInfo = _.find(POOLS, (elem) => {
    return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
  });
  if (!poolInfo) return;
  const tokenAddress = poolInfo.underlying_tokens[0];

  const activity_apy = externalInfo.apyBase;
  const rewards_apy = externalInfo.apyReward;
  const liquidity = await checkMapleV3Liquidity(
    chain,
    poolAddress,
    tokenAddress
  );
  const tvl = await checkMapleV3TVL(chain, poolAddress, tokenAddress);
  const outloans = await checkMapleV3Outloans(chain, poolAddress, tokenAddress);
  const status = await checkMapleV3Status(chain, poolAddress);

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
    share_price: 1,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  return result;
}

export default {
  main: analytics,
  url,
};
