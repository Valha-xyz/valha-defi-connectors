/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const PoolABI = require('');

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
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = PoolABI;
  const method_name = 'deposit';
  const amountBN = '';
  const args = [];
  const interaction_address = '';

  return {
    abi, // json file name
    method_name, // method to interact with the pool
    position_token: underlying_tokens[0], // token needed to approve
    position_token_type: 'ERC-20', // token type to approve
    interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args, // args to pass to the smart contracts to trigger 'method_name'
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = PoolABI;
  const method_name = 'redeem';
  const amountBN = '';
  const args = [];
  const interaction_address = '';

  return {
    abi, // json file name
    method_name, // method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', // token type to approve
    interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args, // args to pass to the smart contracts to trigger 'method_name'
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
  amountNotBN,
  user_address,
  receiver_address,
  lockup_timestamp
) {
  const abi = '';
  const method_name = 'stake';
  const amountBN = '';
  const args = [];
  const interaction_address = '';

  return {
    abi, // json file name
    method_name, // method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', // token type to approve
    interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args, // args to pass to the smart contracts to trigger 'method_name'
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
  amountNotBN,
  user_address,
  receiver_address,
  lockup_timestamp
) {
  const abi = '';
  const method_name = 'unstake';
  const args = [];
  const amountBN = '';
  const interaction_address = '';

  return {
    abi, // json file name
    method_name, // method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', // token type to approve
    interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args, // args to pass to the smart contracts to trigger 'method_name'
  };
}

/// claimRewards
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
  user_address,
  receiver_address,
  lockup_timestamp
) {
  const abi = '';
  const method_name = 'claim';
  const amountBN = '';
  const args = [];
  const interaction_address = '';

  return {
    abi, // json file name
    method_name, // method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', // token type to approve
    interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args, // args to pass to the smart contracts to trigger 'method_name'
  };
}

module.exports = {
  deposit,
  deposit_all: null,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  stake,
  unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};
