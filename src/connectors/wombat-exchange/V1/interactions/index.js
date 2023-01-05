/* eslint-disable @typescript-eslint/no-var-requires */
const BN = require('bn.js');
const ethers = require('ethers');
const PoolABI = require('../abi/Pool.json');
const StakeABI = require('../abi/StakePool.json');
const MasterABI = require('../abi/Master.json');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { getCurrentBlock } = require('../../../../utils/getCurrentBlock');
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

const MasterAddress = '0xE2C07d20AF0Fb50CAE6cDD615CA44AbaAA31F9c8';

async function getWombatPid(poolAddress) {
  try {
    const provider = await getNodeProvider('bsc');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(MasterAddress, MasterABI, provider);
    const idBN = await POOL.getAssetPid(poolAddress);
    return idBN.toString();
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const abi = PoolABI;
  const method_name = 'deposit';
  const currentBlockData = await getCurrentBlock();
  const currentTimestamp = currentBlockData.data.timestamp;
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [
    underlying_tokens[0],
    amountBN,
    amountBN,
    userAddress,
    String(currentTimestamp + 100),
    false,
  ];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const abi = PoolABI;
  const method_name = 'withdraw';
  const currentBlockData = await getCurrentBlock();
  const currentTimestamp = currentBlockData.data.timestamp;
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  // TO REVIEW
  const minAmountBN = new BN(String(parseInt(amountBN.toString()) * 0.98));
  const args = [
    underlying_tokens[0],
    amountBN,
    minAmountBN.toString(),
    userAddress,
    currentTimestamp + 1000,
  ];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const abi = StakeABI;
  const method_name = 'deposit';
  const poolId = await getWombatPid(pool_address);
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [poolId, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const abi = StakeABI;
  const method_name = 'withdraw';
  const id = await getWombatPid(pool_address);
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [id, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: null, //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
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
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
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
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const abi = StakeABI;
  const method_name = 'multiClaim';
  const id = await getWombatPid(pool_address);
  const args = [[id]];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: null, //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: null, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  claim_interests: null,
};
