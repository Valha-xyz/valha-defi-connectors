/* eslint-disable @typescript-eslint/no-var-requires */
import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from "../../../../utils/types/connector-types";

import { toBnERC20Decimals } from "../../../../utils/toBNTokenDecimals";
import { InvestABI } from "../abi/Invest";
import { StakeABI } from "../abi/Stake";
import INVEST_PID from "./INVESTPID";

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = InvestABI;
  const PID = INVEST_PID[pool.pool_address.toLowerCase()];
  const method_name = "deposit(uint256,uint256,bool)";
  const positionToken = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [PID, amountBN, false];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

/// invest
async function depositAndStake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = InvestABI;
  const PID = INVEST_PID[pool.pool_address.toLowerCase()];
  const method_name = "deposit(uint256,uint256,bool)";
  const positionToken = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [PID, amountBN, true];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = InvestABI;
  const PID = INVEST_PID[pool.pool_address.toLowerCase()];
  const method_name = "withdraw(uint256,uint256)";
  const positionToken = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [PID, amountBN];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

async function unstakeAndRedeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = InvestABI;
  const PID = INVEST_PID[pool.pool_address.toLowerCase()];
  const method_name = "withdraw(uint256,uint256)";
  const positionToken = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [PID, amountBN];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

/// stake
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = StakeABI;
  const method_name = "stake(uint256)";
  const positionToken = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [amountBN];
  const interaction_address = pool.staking_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

/// stake
async function unstake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = StakeABI;
  const method_name = "withdraw(uint256,bool)";
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    pool.pool_address // the staking address does not have a decimals functions /!\
  );
  const args = [amountBN, true];
  const interaction_address = pool.staking_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: null, // token needed to approve
      position_token_type: "CUSTOM", //token type to approve
      amount: amountBN,
    },
  };
}

async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = StakeABI;
  const method_name = "getReward()";
  const args = [];
  const interaction_address = pool.staking_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: null, // token needed to approve
      position_token_type: null, //token type to approve
      amount: "0",
    },
  };
}

const interactions: Interactions = {
  deposit: deposit,
  deposit_and_stake: depositAndStake,
  deposit_all: null,
  unlock: null,
  redeem: redeem,
  redeem_all: null,
  unstake_and_redeem: unstakeAndRedeem,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
