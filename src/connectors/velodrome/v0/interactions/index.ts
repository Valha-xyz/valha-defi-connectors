/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  InteractionsReturnObject,
  Pool,
} from 'src/utils/types/connector-types';
const { toBnERC20Decimals } = require('src/utils/toBNTokenDecimals');
const ROUTERABI = require('../abi/ROUTER');
const STAKERABI = require('../abi/STAKER');
const PID = require('./PID');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const stable = pool.metadata.stable ? pool.metadata.stable : false;
  const tokenA = pool.underlying_tokens[0];
  const tokenB = pool.underlying_tokens[1];
  const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase());
  const interaction_address = pool.investing_address;
  let method_name = '';
  let args = [];
  const amountADesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0]
  );
  const amountBDesired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1]
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
      amount.amountsMinimum[tokenPosition],
      pool.chain,
      pool.underlying_tokens[tokenPosition]
    );
    const amountNativeMin = await toBnERC20Decimals(
      amount.amountsMinimum[nativePosition],
      pool.chain,
      pool.underlying_tokens[nativePosition]
    );
    args = [
      pool.underlying_tokens[tokenPosition],
      amountDesired,
      amountMin,
      amountNativeMin,
      addresses.receiverAddress,
      options.deadline,
    ];
  } else {
    method_name = 'addLiquidity';
    const amountAMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[0],
      pool.chain,
      pool.underlying_tokens[0]
    );
    const amountBMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[1],
      pool.chain,
      pool.underlying_tokens[1]
    );
    args = [
      tokenA,
      tokenB,
      stable,
      amountADesired,
      amountBDesired,
      amountAMinimum,
      amountBMinimum,
      addresses.receiverAddress,
      options.deadline,
    ];
  }

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool.underlying_tokens, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: [amountADesired, amountBDesired], //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const stable = pool.metadata.stable ? pool.metadata.stable : false;
  const method_name = 'removeLiquidity';
  const tokenA = pool.underlying_tokens[0];
  const tokenB = pool.underlying_tokens[1];
  const interaction_address = pool.investing_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    pool.pool_address
  );
  const amountAMinimum = await toBnERC20Decimals(
    amount.amountsMinimumNotBN[0],
    pool.chain,
    pool.underlying_tokens[0]
  );
  const amountBMinimum = await toBnERC20Decimals(
    amount.amountsMinimumNotBN[1],
    pool.chain,
    pool.underlying_tokens[1]
  );
  const args = [
    tokenA,
    tokenB,
    stable,
    amountBN,
    amountAMinimum,
    amountBMinimum,
    addresses.receiverAddress,
    options.deadline,
  ];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool.pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// claimInterests
async function claimInterests(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const interaction_address = pool.staking_address;
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

/// stake
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const pid = PID[pool.pool_address.toLowerCase()];
  const interaction_address = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    pool.pool_address
  );
  const abi = STAKERABI;
  const method_name = 'deposit';
  const args = [amountBN, pid];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool.pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unstake
async function unstake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const pid = PID[pool.pool_address.toLowerCase()];
  const interaction_address = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    pool.pool_address
  );
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

/// claimRewards
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const pid = PID[pool.pool_address.toLowerCase()];
  const interaction_address = pool.staking_address;
  const amountBN = await toBnERC20Decimals(0, pool.chain, pool.pool_address);
  const abi = STAKERABI;
  // Indeed 'deposit' to claim_rewards on Pancake
  const method_name = 'getReward';
  const args = [addresses.receiverAddress, pool.rewards_tokens];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool.pool_address, // token needed to approve
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
