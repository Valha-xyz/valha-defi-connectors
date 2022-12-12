/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const PoolABI = require('../abi/PoolToken.json');
const RewardsABI = require('../abi/MplRewards.json');

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
  const abi = PoolABI;
  const method_name = 'deposit';
  const args = [amountBN];

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
  amountBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  const abi = PoolABI;
  const method_name = 'intendToWithdraw';
  const args = [];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: null, //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
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
  const abi = PoolABI;
  const method_name = 'withdraw';
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
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
  const abi = RewardsABI;
  const method_name = 'stake';
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
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
  const abi = RewardsABI;
  const method_name = 'withdraw';
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: null, //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
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
  const abi = RewardsABI;
  const method_name = 'getReward';
  const args = [];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null,
    position_token_type: null, //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

module.exports = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: unlock,
  redeem: redeem,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};
