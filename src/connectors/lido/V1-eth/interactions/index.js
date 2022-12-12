/* eslint-disable @typescript-eslint/no-unused-vars */
const STETHABI = require('../abi/STETH.json');

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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  const abi = STETHABI;
  const method_name = 'submit';
  const args = ['0x0000000000000000000000000000000000000000'];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: underlying_tokens[0], // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unlock
async function unlock() {
  return {};
}

/// redeem
async function redeem(
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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  return {};
}

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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
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
