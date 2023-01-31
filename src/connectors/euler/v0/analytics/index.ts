import { BigNumber } from "ethers";
import { erc20Decimals } from "../../../../utils/ERC20Decimals";
import { getNodeProvider } from "../../../../utils/getNodeProvider";
import { Chain } from "../../../../utils/types/networks";
import { queryEulerGraphData, SUBGRAPH_URL } from "./external/graph-query";

async function analytics(chain: Chain, poolAddress: string) {
  const allPoolInfo = await queryEulerGraphData();

  // We get the current pool inside this big array
  const currentPoolInfo = allPoolInfo.find(
    (pool) => pool.eTokenAddress == poolAddress
  );

  const provider = await getNodeProvider("ethereum");

  const apiDecimals = 18;
  const decimalFactor = BigNumber.from(10).pow(apiDecimals);

  const additionalPercentageDecimals = 9;

  const result = {
    status: null,
    tvl: BigNumber.from(currentPoolInfo.totalBalancesUsd).div(decimalFactor).toNumber(),
    liquidity: BigNumber.from(currentPoolInfo.totalBalancesUsd).sub(currentPoolInfo.totalBorrowsUsd).div(decimalFactor).toNumber(),
    outloans: BigNumber.from(currentPoolInfo.totalBorrowsUsd).div(decimalFactor).toNumber(),
    losses: null,
    capacity: Number.MAX_SAFE_INTEGER,
    apy: BigNumber.from(currentPoolInfo.supplyAPY).div(decimalFactor).toNumber() / 10**9,
    activity_apy: BigNumber.from(currentPoolInfo.supplyAPY).div(decimalFactor).toNumber() / 10**9,
    rewards_apy: 0,
    boosting_apy: null,
    share_price: parseInt(currentPoolInfo.totalBalancesUsd)/parseInt(currentPoolInfo.totalSupply),
    minimum_deposit: null,
    maximum_deposit: null,
  };
  return result;
}

//analytics(Chain.ethereum, "0x1b808f49add4b8c6b5117d9681cf7312fcf0dc1d")
module.exports = {
  main: analytics,
  url: SUBGRAPH_URL,
};
