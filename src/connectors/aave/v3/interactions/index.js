/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const PoolABI = require('../abi/Pool.json');

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
  const abi = PoolABI;
  const method_name = 'supply';
  const amountBN = await toBnERC20Decimals(
    amountNotBN,
    chain,
    underlying_tokens[0]
  );
  const args = [underlying_tokens[0], amountBN, userAddress, 0];
  const interaction_address = investing_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: underlying_tokens[0], // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
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
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp
) {
  const abi = PoolABI;
  const method_name = 'withdraw';
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, pool_address);
  const args = [underlying_tokens[0], amountBN, receiverAddress];
  const interaction_address = investing_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
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
  const abi = PoolABI;
  const method_name = 'claimRewards';
  const amountBN = await toBnERC20Decimals(
    amountNotBN,
    chain,
    underlying_tokens[0]
  );
  const args = [[underlying_tokens[0]], amountBN, receiver_address];
  const interaction_address = investing_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
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
  claim_rewards: claimRewards,
  claim_interests: null,
};
