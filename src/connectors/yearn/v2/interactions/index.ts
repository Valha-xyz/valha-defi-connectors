/* eslint-disable @typescript-eslint/no-var-requires */

import { toBnERC20Decimals } from "src/utils/toBNTokenDecimals";
import {
  AdditionalOptions,
  AddressesInput,
  Amount,
  AmountInput,
  InteractionsReturnObject,
  Pool,
} from "src/utils/types/connector-types";

/* eslint-disable @typescript-eslint/no-unused-vars */

import VaultAbi from "../abi/vault.json";

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = VaultAbi;
  const method_name = "deposit";
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: pool.pool_address, // contract to interact with to interact with poolAddress
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
  const abi = VaultAbi;
  const method_name = "withdraw";
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: pool.pool_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

module.exports = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null,
};
