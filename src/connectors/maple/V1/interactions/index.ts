import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from "src/utils/types/connector-types";

/* eslint-disable @typescript-eslint/no-unused-vars */
const PoolABI = require("../abi/PoolToken.json");
const RewardsABI = require("../abi/MplRewards.json");
const { toBnERC20Decimals } = require("../../../../utils/toBNTokenDecimals");

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject>  {
  const abi = PoolABI;
  const method_name = "deposit";
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: position_token, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

/// unlock
async function unlock(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject>  {
  const abi = PoolABI;
  const method_name = "intendToWithdraw";
  const args = [];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject>  {
  const abi = PoolABI;
  const method_name = "withdraw";
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: position_token, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

/// stake
//TBD
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject>  {
  const abi = RewardsABI;
  const method_name = "stake";
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: position_token, // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: amountBN,
    },
  };
}

/// unstake
//TBD
async function unstake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject>  {
  const abi = RewardsABI;
  const method_name = "withdraw";
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = RewardsABI;
  const method_name = "getReward";
  const args = [];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

const interactions: Interactions = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: unlock,
  redeem: redeem,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};
export default interactions;
