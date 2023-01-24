/* eslint-disable @typescript-eslint/no-var-requires */
const SanPoolABI = require('../abi/SanToken.json');
const StakingABI = require('../abi/StakingPool.json');
const DistributorABI = require('../abi/Distributor.json');
const StableABI = require('../abi/StableMaster.json');
const ethers = require('ethers');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

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
  const abi = StableABI;
  const method_name = 'deposit';
  const poolManager = await getSanPoolManager(pool_address);
  if (!poolManager) throw new Error('Angle pool manager was not found');
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN, userAddress, poolManager];

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
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = StableABI;
  const method_name = 'withdraw';
  const poolManager11 = await getSanPoolManager(pool_address);
  if (!poolManager11) throw new Error('Angle pool manager was not found');
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN, receiverAddress, userAddress, poolManager11];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token,
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
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = StakingABI;
  const method_name = 'deposit(uint256,address)';
  const position_token = pool_address;
  let args = [];
  let amountBN = '';
  if (staking_address) {
    amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
    args = [amountBN, userAddress];
  } else {
    args = ['0', userAddress];
  }

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token,
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
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = StakingABI;
  const method_name = 'withdraw(uint256)';
  const position_token = staking_address;
  let args = [];
  let amountBN = '';
  if (staking_address) {
    amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
    args = [amountBN];
  } else {
    args = ['0'];
  }

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token,
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  const abi = StakingABI;
  const method_name = 'claim_rewards(address)';
  const args = [userAddress];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null,
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
