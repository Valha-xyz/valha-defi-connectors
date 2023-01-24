/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const { gql, request } = require('graphql-request');
const { getGeckoTokenPrice } = require('src/utils/prices/getGeckoTokenPrice');

const SECONDS_PER_YEAR = 31536000;
const SUBGRAPH_URLS = {
  optimism: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-optimism',
  avalanche:
    'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-avalanche',
  arbitrum: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum',
  polygon: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon',
  fantom: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-fantom',
};
const reserveQuery = gql`
  query ReservesQuery {
    reserves {
      name
      borrowingEnabled
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

async function getRewardsAPY(chain, rewards) {
  try {
    // const USDRewardPrice = await getGeckoTokenPrice(chain, rewards.rewardToken);
    const rewardPerYear = rewards.reduce(async (acc, rew) => {
      const { data, err } = await getGeckoTokenPrice(chain, rew.rewardToken);
      if (err) throw new Error(err);
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
    return { data: null, err: err };
  }
}

async function checkAaveV3APYs(chain, poolAddress, totalSupplyUSD) {
  try {
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const { reserves } = await request(SUBGRAPH_URL, reserveQuery);
    const data = await reserves.filter(
      (elem) =>
        poolAddress.toLowerCase() ===
        elem.aToken.underlyingAssetAddress.toLowerCase()
    );
    if (data.length !== 1)
      throw new Error(
        `AAVE V3: there was an issue while checking APY for ${poolAddress}`
      );
    const poolInfo = data[0];

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
        activity_apy: activity_apy,
        rewards_apy: rewards_apy,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkAaveV3APYs;
