import curve from "@curvefi/api";
import axios from "axios";
import { ethers } from "ethers";
import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Pool,
} from "src/utils/types/connector-types";
import { Amount } from "src/utils/types/utils";
import { toBnERC20Decimals } from "../../../../utils/toBnTokenDecimals";

async function getDepositAmountsArg(
  underlying_coin_addresses: string[],
  underlying_tokens_to_invest: string[],
  amountsMinimumNotBN: Amount[],
  chain: string
) {
  const amounts = [];
  for (let i = 0; i < underlying_coin_addresses.length; i++) {
    const index = underlying_tokens_to_invest.indexOf(
      underlying_coin_addresses[i]
    );
    if (index === -1) amounts.push("0");
    else {
      amounts.push(
        await toBnERC20Decimals(
          amountsMinimumNotBN[index].humanValue,
          chain,
          underlying_coin_addresses[i]
        )
      );
    }
  }
  return amounts;
}

async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  const poolInfo = curve.getPool(pool.name);

  let args: [string[], string] = [[], "0"];

  args[0] = await getDepositAmountsArg(
    poolInfo.underlyingCoinAddresses,
    pool.underlying_tokens,
    amount.amountsMinimum,
    pool.chain
  );
  args[1] = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    poolInfo.lpToken
  );

  return {
    abi: `stablePool${poolInfo.underlyingCoins.length}.ts`,
    pool_address: poolInfo.address,
    pool_name: poolInfo.name,
    position_token: poolInfo.lpToken,
    interaction_address: poolInfo.address,
    amount: args[1],
    method_name: "add_liquidity",
    args: args,
  };
}

// main();
/// redeem
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
