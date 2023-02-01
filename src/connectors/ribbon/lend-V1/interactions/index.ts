/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from "src/utils/types/connector-types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import FACTORYABI from "../abi/Factory.json";
import POOLABI from "../abi/Pool.json";
import { toBnERC20Decimals } from "../../../../utils/toBNTokenDecimals";

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const method_name = "provide";
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN, "0x0000000000000000000000000000000000000000"];

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
async function unlock() {
  return {};
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const method_name = "redeem";
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
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {};
}

/// unstake
async function unstake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {};
}

/// claimRewards
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = FACTORYABI;
  const method_name = "withdrawReward";
  const args = [[pool.pool_address]];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.distributor_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

const interactions: Interactions = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
