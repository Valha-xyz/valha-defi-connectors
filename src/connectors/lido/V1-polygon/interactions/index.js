/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { toBnERC20Decimals } = require('src/utils/toBNTokenDecimals');
const STABI = require('../abi/STMATIC.json');

/// invest
async function deposit(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  const abi = STABI;
  const method_name = 'submit';
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unlock
async function unlock(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  const abi = STABI;
  const method_name = 'requestWithdraw';
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

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
//   userAddress,
//   receiverAddress,
//   lockupTimestamp
// ) {
//   const abi = STABI;
//   const method_name = 'withdraw';
//   const args = [amountBN];

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: underlying_tokens[0], // token needed to approve
//     position_token_type: 'ERC-20', //token type to approve
//     interaction_address: pool_address, // contract to interact with to interact with poolAddress
//     args: args, //args to pass to the smart contracts to trigger 'method_name'
//   };
// }

/// stake
async function stake(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

/// unstake
async function unstake(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

/// boost
async function boost(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

/// unboost
async function unboost(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

/// claim
async function claimRewards(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

module.exports = {
  deposit: deposit,
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
