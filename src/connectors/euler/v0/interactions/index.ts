/* eslint-disable @typescript-eslint/no-var-requires */

import { toBnERC20Decimals } from "src/utils/toBNTokenDecimals";
import {
  AdditionalOptions,
  AddressesInput,
  Amount,
  AmountInput,
  InteractionFunctionNames,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from "src/utils/types/connector-types";

/* eslint-disable @typescript-eslint/no-unused-vars */

import eTokenABI from "../abi/euler_etoken.json";
import stakeABI from "../abi/euler_staking.json";

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = eTokenABI;
  const method_name = "deposit";
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [options?.other?.subAccountId ?? 0, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = eTokenABI;
  const method_name = "withdraw";
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  // Here we could check if amountBN is undefined. The contract allows for passing the max number value to withdraw all
  const args = [options?.other?.subAccountId ?? 0, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}


/// stake
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = stakeABI;
  const method_name = 'stake';
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [options?.other?.subAccountId ?? 0, amountBN];
  const interaction_address = pool.staking_address;

  return {
    abi: abi, //json file
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unstake
async function unstake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = stakeABI;
  const method_name = 'withdraw';
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [options?.other?.subAccountId ?? 0, amountBN];
  const interaction_address = pool.staking_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// claimRewards
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = stakeABI;
  const method_name = 'getReward';
  const args = [];
  const interaction_address = pool.staking_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

export default {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
} as Interactions;
