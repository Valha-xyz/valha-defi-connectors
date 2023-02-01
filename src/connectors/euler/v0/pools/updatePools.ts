import fs from "fs";
import { Pool } from "../../../../utils/types/connector-types";
import { Chain } from "../../../../utils/types/networks";
import { queryEulerGraphData } from "../analytics/external/graph-query";
const path = require("path");
const _ = require("lodash");

async function generatePools(): Promise<Pool | Record<never, never>> {
  const pools = await queryEulerGraphData();

  if (!pools || pools.length === 0) {
    return {};
  }

  const modifiedPools: Pool[] = _.compact(
    pools
      .filter((pool) => pool)
      .map((elem): Pool | undefined => {
        const rewardsTokens = ["0xd9fcd98c322942075a5c3860693e9f4f03aae07b"];
        const stakingTokens = {
          "Wrapped Ether": "0x229443bf7f1297192394b7127427db172a5bde9e",
          "USD Coin": "0xe5afe81e63f0a52a3a03b922b30f73b8ce74d570",
          "Tether USD": "0x7882f919e3acca984babd70529100f937d90f860",
        };

        return {
          name: elem.name,
          chain: "ethereum",
          underlying_tokens: [elem.id],
          pool_address: elem.eTokenAddress,
          investing_address: elem.eTokenAddress,
          staking_address: stakingTokens[elem.name] ?? null,
          boosting_address: null,
          distributor_address: stakingTokens[elem.name] ?? null,
          rewards_tokens: stakingTokens[elem.name] ? rewardsTokens : null,
          metadata: {},
        };
      })
  );
  return modifiedPools;
}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, "/generatedPools.json");
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
