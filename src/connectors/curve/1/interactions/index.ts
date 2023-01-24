/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import curve from "@curvefi/api";
import axios from "axios";
import { ethers } from "ethers";
import { toBnERC20Decimals } from "../../../../utils/toBnTokenDecimals";

async function getDepositAmountsArg(
  underlyingCoinAddresses: string[],
  underlying_tokens_to_invest: string[],
  amountsMinimumNotBN: string[],
  chain: string
) {
  const amounts = [];
  for (let i = 0; i < underlyingCoinAddresses.length; i++) {
    const index = underlying_tokens_to_invest.indexOf(
      underlyingCoinAddresses[i]
    );
    if (index === -1) amounts.push("0");
    else {
      amounts.push(
        await toBnERC20Decimals(
          amountsMinimumNotBN[index],
          chain,
          underlyingCoinAddresses[i]
        )
      );
    }
  }
  return amounts;
}

async function deposit(info: {
  pool_name: string;
  chain: string;
  underlying_tokens: string[];
  pool_address: string;
  investing_address: string;
  staking_address: string;
  boosting_address: string;
  distributor_address: string;
  rewards_tokens: string[];
  metadata: string;
  amountNotBN: string;
  amountsDesiredNotBN: string[];
  amountsMinimumNotBN: string[];
  ranges: string[];
  rangeToken: string;
  userAddress: string;
  receiverAddress: string;
  lockupTimestamp: string;
  deadline: string;
}) {
  const pool = curve.getPool(info.pool_name);

  let args: [string[], string] = [[], "0"];

  args[0] = await getDepositAmountsArg(
    pool.underlyingCoinAddresses,
    info.underlying_tokens,
    info.amountsDesiredNotBN,
    info.chain
  );
  args[1] = await toBnERC20Decimals(info.amountNotBN, info.chain, pool.lpToken);

  return {
    abi: `stablePool${pool.underlyingCoins.length}.ts`,
    pool_address: pool.address,
    pool_name: pool.name,
    position_token: pool.lpToken,
    interaction_address: pool.address,
    amount: await toBnERC20Decimals(info.amountNotBN, info.chain, pool.lpToken),
    method_name: "add_liquidity",
    args: args,
  };
}

// main();
// /// redeem
// async function redeem(
//   pool_name,
//   chain,
//   underlying_tokens,
//   pool_address,
//   investing_address,
//   staking_address,
//   boosting_address,
//   distributor_address,
//   rewards_tokens,
//   metadata,
//   amountNotBN,
//   amountsDesiredNotBN,
//   amountsMinimumNotBN,
//   ranges,
//   rangeToken,
//   userAddress,
//   receiverAddress,
//   lockupTimestamp,
//   deadline
// ) {
//   const abi = PoolABI;
//   const method_name = "redeem";
//   const amountBN = "";
//   const args = [];
//   const interaction_address = "";

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: pool_address, // token needed to approve
//     position_token_type: "ERC-20", //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
//     amount: amountBN,
//     args: args, //args to pass to the smart contracts to trigger 'method_name'
//   };
// }

// /// stake
// async function stake(
//   pool_name,
//   chain,
//   underlying_tokens,
//   pool_address,
//   investing_address,
//   staking_address,
//   boosting_address,
//   distributor_address,
//   rewards_tokens,
//   metadata,
//   amountNotBN,
//   user_address,
//   receiver_address,
//   lockup_timestamp
// ) {
//   const abi = "";
//   const method_name = "stake";
//   const amountBN = "";
//   const args = [];
//   const interaction_address = "";

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: null, // token needed to approve
//     position_token_type: "ERC-20", //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
//     amount: amountBN,
//     args: args, //args to pass to the smart contracts to trigger 'method_name'
//   };
// }

// /// unstake
// async function unstake(
//   pool_name,
//   chain,
//   underlying_tokens,
//   pool_address,
//   investing_address,
//   staking_address,
//   boosting_address,
//   distributor_address,
//   rewards_tokens,
//   metadata,
//   amountNotBN,
//   user_address,
//   receiver_address,
//   lockup_timestamp
// ) {
//   const abi = "";
//   const method_name = "unstake";
//   const args = [];
//   const amountBN = "";
//   const interaction_address = "";

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: null, // token needed to approve
//     position_token_type: "ERC-20", //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
//     amount: amountBN,
//     args: args, //args to pass to the smart contracts to trigger 'method_name'
//   };
// }

// /// claimRewards
// async function claimRewards(
//   pool_name,
//   chain,
//   underlying_tokens,
//   pool_address,
//   investing_address,
//   staking_address,
//   boosting_address,
//   distributor_address,
//   rewards_tokens,
//   metadata,
//   amountNotBN,
//   user_address,
//   receiver_address,
//   lockup_timestamp
// ) {
//   const abi = "";
//   const method_name = "claim";
//   const amountBN = "";
//   const args = [];
//   const interaction_address = "";

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: null, // token needed to approve
//     position_token_type: "ERC-20", //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
//     amount: amountBN,
//     args: args, //args to pass to the smart contracts to trigger 'method_name'
//   };
// }

// module.exports = {
//   deposit: deposit,
//   deposit_and_stake: null,
//   unlock: null,
//   redeem: redeem,
//   stake: stake,
//   unstake: unstake,
//   boost: null,
//   unboost: null,
//   claim_rewards: claimRewards,
//   claim_interests: null,
// };
