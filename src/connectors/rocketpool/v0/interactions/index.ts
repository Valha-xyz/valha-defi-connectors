/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from "../../../../utils/types/connector-types";
const { toBnERC20Decimals } = require("../../../../utils/toBNTokenDecimals");
const PoolABI = require("../abi/DepositPool.json");

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolABI;
  const method_name = "deposit";
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  );
  const args = [];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.underlying_tokens[0], // token needed to approve
      position_token_type: "ERC-20", // token type to approve
      amount: amountBN,
    },
  };
}

/// / NOT A REAL "REDEEM" function, it enables to get the balance that was not staked yet but send to RocketPool
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
//   const method_name = 'withdrawExcessBalance';
//   const position_token = pool_address;
//   const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
//   const args = [amountBN];
//   const interaction_address = investing_address;

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: position_token, // token needed to approve
//     position_token_type: 'ERC-20', //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
//     amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
//   const abi = '';
//   const method_name = 'stake';
//   const args = [];
//   const interaction_address = '';

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: null, // token needed to approve
//     position_token_type: 'ERC-20', //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
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
//   const abi = '';
//   const method_name = 'unstake';
//   const args = [];
//   const interaction_address = '';

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: null, // token needed to approve
//     position_token_type: 'ERC-20', //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
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
//   const abi = '';
//   const method_name = 'claim';
//   const args = [];
//   const interaction_address = '';

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: null, // token needed to approve
//     position_token_type: 'ERC-20', //token type to approve
//     interaction_address: interaction_address, // contract to interact with to interact with poolAddress
//     args: args, //args to pass to the smart contracts to trigger 'method_name'
//   };
// }

const interactions: Interactions = {
  deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null,
};

export default interactions;
