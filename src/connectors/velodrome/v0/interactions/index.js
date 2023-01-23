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
  const stable = metadata.stable ? metadata.stable : false;
  const tokenA = underlying_tokens[0];
  const tokenB = underlying_tokens[1];
  const tokens = underlying_tokens.map((elem) => elem.toLowerCase());
  const interaction_address = investing_address;
  let method_name = '';
  let args = [];
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

  if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
    method_name = 'addLiquidityETH';
    let amountDesired;
    let nativePosition;
    let tokenPosition;
    if (tokens[0] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 0;
      tokenPosition = 1;
      amountDesired = amountADesired;
    }
    if (tokens[1] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 1;
      tokenPosition = 0;
      amountDesired = amountBDesired;
    }
    const amountMin = await toBnERC20Decimals(
      amountsMinimumNotBN[tokenPosition],
      chain,
      underlying_tokens[tokenPosition]
    );
    const amountNativeMin = await toBnERC20Decimals(
      amountsMinimumNotBN[nativePosition],
      chain,
      underlying_tokens[nativePosition]
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
      stable,
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
    amount: [amountADesired, amountBDesired], //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  const stable = metadata.stable ? metadata.stable : false;
  const method_name = 'removeLiquidity';
  const tokenA = underlying_tokens[0];
  const tokenB = underlying_tokens[1];
  const interaction_address = investing_address;
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
    stable,
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
    amount: amountBN,
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
  const interaction_address = staking_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, pool_address);
  const abi = STAKERABI;
  const method_name = 'deposit';
  const args = [amountBN, pid];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
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
  const interaction_address = staking_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, pool_address);
  const abi = STAKERABI;
  const method_name = 'withdrawToken';
  const args = [amountBN, pid];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// claimInterests
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
  const interaction_address = staking_address;
  const abi = STAKERABI;
  // Indeed 'deposit' to claim_rewards on Pancake
  const method_name = 'claimFees';
  const args = [];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: null,
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
  const interaction_address = staking_address;
  const amountBN = await toBnERC20Decimals(0, chain, pool_address);
  const abi = STAKERABI;
  // Indeed 'deposit' to claim_rewards on Pancake
  const method_name = 'getReward';
  const args = [receiverAddress, rewards_tokens];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
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
