/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { toBnERC20Decimals } = require('src/utils/toBNTokenDecimals');
const ROUTERABI = require('../abi/ROUTER');
const STAKERABI = require('../abi/STAKER');
const PID = require('./PID');

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
  const abi = ROUTERABI;
  const tokenA = underlying_tokens[0];
  const tokenB = underlying_tokens[1];
  const interaction_address = pool_address;
  let method_name = '';
  let args = [];
  let nativeTokenPosition = -1;
  let tokenPosition = -1;
  if (tokenA === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    nativeTokenPosition = 0;
    tokenPosition = 1;
  }
  if (tokenB === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    nativeTokenPosition = 1;
    tokenPosition = 0;
  }

  if (nativeTokenPosition !== -1) {
    method_name = 'addLiquidityETH';
    const amountDesired = await toBnERC20Decimals(
      amountsDesiredNotBN[tokenPosition],
      chain,
      underlying_tokens[tokenPosition]
    );
    const amountMin = await toBnERC20Decimals(
      amountsMinimumNotBN[tokenPosition],
      chain,
      underlying_tokens[tokenPosition]
    );
    const amountNativeMin = await toBnERC20Decimals(
      amountsMinimumNotBN[nativeTokenPosition],
      chain,
      underlying_tokens[nativeTokenPosition]
    );
    args = [
      underlying_tokens[tokenPosition],
      amountDesired,
      amountMin,
      amountNativeMin,
      receiverAddress,
      deadline,
    ];
  } else {
    method_name = 'addLiquidity';
    const amountADesired = await toBnERC20Decimals(
      amountsDesiredNotBN[0],
      chain,
      underlying_tokens[0]
    );
    const amountBDesired = await toBnERC20Decimals(
      amountsDesiredNotBN[1],
      chain,
      underlying_tokens[1]
    );
    const amountAMinimum = await toBnERC20Decimals(
      amountsMinimumNotBN[0],
      chain,
      underlying_tokens[0]
    );
    const amountBMinimum = await toBnERC20Decimals(
      amountsMinimumNotBN[1],
      chain,
      underlying_tokens[1]
    );
    args = [
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMinimum,
      amountBMinimum,
      receiverAddress,
      deadline,
    ];
  }

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: underlying_tokens, // token needed to approve
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
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = ROUTERABI;
  const method_name = 'removeLiquidity';
  const tokenA = underlying_tokens[0];
  const tokenB = underlying_tokens[1];
  const interaction_address = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, pool_address);
  const amountAMinimum = await toBnERC20Decimals(
    amountsMinimumNotBN[0],
    chain,
    underlying_tokens[0]
  );
  const amountBMinimum = await toBnERC20Decimals(
    amountsMinimumNotBN[1],
    chain,
    underlying_tokens[1]
  );
  const args = [
    tokenA,
    tokenB,
    amountBN,
    amountAMinimum,
    amountBMinimum,
    receiverAddress,
    deadline,
  ];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
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
  const pid = PID[pool_address.toLowerCase()];
  const interaction_address = '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652';
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, pool_address);
  const abi = STAKERABI;
  const method_name = 'deposit';
  const args = [pid, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
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
  const pid = PID[pool_address.toLowerCase()];
  const interaction_address = '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652';
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, pool_address);
  const abi = STAKERABI;
  const method_name = 'withdraw';
  const args = [pid, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
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
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const pid = PID[pool_address.toLowerCase()];
  const interaction_address = '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652';
  const amountBN = await toBnERC20Decimals(0, chain, pool_address);
  const abi = STAKERABI;
  // Indeed 'deposit' to claim_rewards on Pancake
  const method_name = 'deposit';
  const args = [pid, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
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
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};
