/* eslint-disable @typescript-eslint/no-var-requires */
import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from "../../../../utils/types/connector-types";
const ethers = require("ethers");
const { getNodeProvider } = require("../../../../utils/getNodeProvider");
const { toBnERC20Decimals } = require("../../../../utils/toBNTokenDecimals");
import { StableABI2 } from "./../abi/Stable2";
import { StableABI3 } from "./../abi/Stable3";
import { StableABI4 } from "./../abi/Stable4";
import { GaugeABI } from "../abi/Gauge";

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const size = pool.underlying_tokens.length;
  let abi: any;
  if (size === 2) {
    abi = StableABI2;
  } else if (size === 3) {
    abi = StableABI3;
  } else if (size === 4) {
    abi = StableABI4;
  } else {
    throw new Error("Error: pool size is not handle.");
  }
  const method_name = `add_liquidity(uint256[${size}], uint256)`;
  const position_token = pool.underlying_tokens;
  const amountsBN = [];
  for (const i in pool.underlying_tokens) {
    const amountBN = await toBnERC20Decimals(
      amount.amountsDesired[i],
      pool.chain,
      pool.underlying_tokens[i]
    );
    amountsBN.push(amountBN);
  }
  const amountMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.pool_address
  );
  const args = [amountsBN, amountMinimum];

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
      amount: amountsBN,
    },
  };
}

/// invest
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const size = pool.underlying_tokens.length;
  let abi: any;
  if (size === 2) {
    abi = StableABI2;
  } else if (size === 3) {
    abi = StableABI3;
  } else if (size === 4) {
    abi = StableABI4;
  } else {
    throw new Error("Error: pool size is not handle.");
  }
  const method_name = `remove_liquidity(uint256, uint256[${size}])`;
  const position_token = pool.pool_address;
  const amountsBN = [];
  for (const i in pool.underlying_tokens) {
    pool.underlying_tokens[i];
    const amountBN = await toBnERC20Decimals(
      amount.amountsMinimum[i],
      pool.chain,
      pool.underlying_tokens[i]
    );
    amountsBN.push(amountBN);
  }
  const amountDesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    position_token
  );
  const args = [amountDesired, amountsBN];
  console.log(args);

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: [position_token], // token needed to approve
      position_token_type: "ERC-20", //token type to approve
      amount: [amountDesired],
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
  const abi = GaugeABI;
  const method_name = "deposit(uint256,address)";
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN, addresses.userAddress];

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
async function unstake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = GaugeABI;
  const method_name = "withdraw(uint256,bool)";
  const position_token = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN, true];

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

/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = GaugeABI;
  const method_name = "claim_rewards(address)";
  const args = [addresses.userAddress];

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
  deposit_all: null,
  unlock: null,
  redeem: redeem,
  redeem_all: null,
  unstake_and_redeem: null,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
