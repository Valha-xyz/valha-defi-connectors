/* eslint-disable @typescript-eslint/no-var-requires */
const SanPoolABI = require('../abi/SanToken.json');
const StakingABI = require('../abi/StakingPool.json');
const DistributorABI = require('../abi/Distributor.json');
const StableABI = require('../abi/StableMaster.json');
const { getNodeProvider } = require('src/utils/getNodeProvider');
import { ethers } from 'ethers';

async function getSanPoolManager(poolAddress) {
  try {
    const provider = await getNodeProvider('ethereum');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, SanPoolABI, provider);
    const poolManagerAddress = await POOL.poolManager();
    return poolManagerAddress;
  } catch (err) {
    console.log(err);
    return null;
  }
}

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
  const abi = StableABI;
  const method_name = 'deposit';
  const poolManager = await getSanPoolManager(pool_address);
  if (!poolManager) throw new Error('Angle pool manager was not found');
  const args = [amountBN, userAddress, poolManager];

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
  const abi = StableABI;
  const method_name = 'withdraw';
  const poolManager11 = await getSanPoolManager(pool_address);
  if (!poolManager11) throw new Error('Angle pool manager was not found');
  const args = [amountBN, receiverAddress, userAddress, poolManager11];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address,
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
  const abi = StakingABI;
  const method_name = 'deposit';
  const args = [amountBN, userAddress];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address,
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
  const abi = StakingABI;
  const method_name = 'withdraw';
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: staking_address,
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
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
  const abi = StakingABI;
  const method_name = 'claim_rewards';
  const args = [userAddress];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null,
    position_token_type: null, //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

async function claimInterests(
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
  const abi = DistributorABI;
  const method_name = 'claim';
  const args = [userAddress];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null,
    position_token_type: null,
    interaction_address: distributor_address, // contract to interact with to interact with poolAddress
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

module.exports = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: claimInterests,
};
