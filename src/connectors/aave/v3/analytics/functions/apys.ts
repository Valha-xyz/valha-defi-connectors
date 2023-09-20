import { gql, request } from 'graphql-request';
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';

const SECONDS_PER_YEAR = 31536000;
const SUBGRAPH_URLS = {
  optimism: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-optimism',
  avalanche:
    'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-avalanche',
  arbitrum: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum',
  polygon: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon',
  fantom: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-fantom',
  ethereum: 'https://api.thegraph.com/subgraphs/name/messari/aave-v3-ethereum',
  base: 'https://api.thegraph.com/subgraphs/name/messari/aave-v3-base',
};
const reserveQuery = gql`
  query ReservesQuery {
    reserves {
      name
      aToken {
        id
        rewards {
          id
          emissionsPerSecond
          rewardToken
          rewardTokenDecimals
          rewardTokenSymbol
          distributionEnd
        }
        underlyingAssetAddress
        underlyingAssetDecimals
      }
      vToken {
        rewards {
          emissionsPerSecond
          rewardToken
          rewardTokenDecimals
          rewardTokenSymbol
          distributionEnd
        }
      }
      symbol
      liquidityRate
      variableBorrowRate
      baseLTVasCollateral
      isFrozen
    }
  }
`;

const reserveQueryOthers = gql`
  {
    markets {
      id
      rates {
        id
        rate
      }
    }
  }
`;

async function getRewardsAPY(chain, rewards) {
  try {
    // const USDRewardPrice = await getGeckoTokenPrice(chain, rewards.rewardToken);
    const rewardPerYear = await rewards.reduce(async (acc, rew) => {
      const { data, err } = await getGeckoTokenPrice(chain, rew.rewardToken);
      if (err) throw err;
      const USDRewardPrice = data;
      return (
        acc +
        (rew.emissionsPerSecond / 10 ** rew.rewardTokenDecimals) *
          SECONDS_PER_YEAR *
          USDRewardPrice
      );
    }, 0);
    return { data: rewardPerYear, err: null };
  } catch (err) {
    return { data: null, err };
  }
}

async function checkAaveV3FirstAPYs(chain, poolAddress, totalSupplyUSD) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const { reserves } = (await request(SUBGRAPH_URL, reserveQuery)) as any;
    const data = await reserves.filter(
      (elem) => poolAddress.toLowerCase() === elem.aToken.id.toLowerCase(),
    );
    if (data.length !== 1) {
      throw new Error(
        `AAVE V3: there was an issue while checking APY for ${poolAddress}`,
      );
    }
    const poolInfo = data[0];

    /// information on 27 decimals coming from documentation
    const activity_apy = (poolInfo.liquidityRate / 10 ** 27) * 100;
    let rewards_apy = 0;
    const { rewards } = poolInfo.aToken;
    const supplyRewardEnd = rewards[0]?.distributionEnd * 1000;
    const timestamp = Date.now();
    if (supplyRewardEnd > timestamp) {
      const { data, err } = await getRewardsAPY(chain, rewards);
      if (err) throw new Error(err.message);
      const rewardsPerYear = data;
      rewards_apy = (rewardsPerYear / totalSupplyUSD) * 100;
    }
    return {
      data: {
        activity_apy,
        rewards_apy,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

async function checkAaveV3OtherAPYs(chain, poolAddress) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const queryData = (await request(SUBGRAPH_URL, reserveQueryOthers)) as any;
    const data = await queryData.markets.filter(
      (elem) => poolAddress.toLowerCase() === elem.id.toLowerCase(),
    );
    if (data.length !== 1) {
      throw new Error(
        `AAVE V3: there was an issue while checking APY for ${poolAddress}`,
      );
    }
    const poolInfo = data[0];
    /// information on 27 decimals coming from documentation
    const activity_apy = Number(poolInfo.rates[2].rate);
    const rewards_apy = 0;
    return {
      data: {
        activity_apy,
        rewards_apy,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

async function checkAaveV3APYs(chain, poolAddress, totalSupplyUSD) {
  let rewards;
  const validChains = [
    'avalanche',
    'fantom',
    'polygon',
    'arbitrum',
    'optimism',
  ];

  if (validChains.includes(chain)) {
    rewards = await checkAaveV3FirstAPYs(chain, poolAddress, totalSupplyUSD);
  } else {
    rewards = await checkAaveV3OtherAPYs(chain, poolAddress);
  }

  return {
    rewards,
    err: null,
  };
}

export default checkAaveV3APYs;
