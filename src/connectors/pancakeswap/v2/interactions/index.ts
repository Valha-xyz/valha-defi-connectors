/* eslint-disable @typescript-eslint/no-var-requires */

import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from '../../../../utils/types/connector-types';

/* eslint-disable @typescript-eslint/no-unused-vars */
const { toBnERC20Decimals } = require('../../../../../utils/toBNTokenDecimals');
const { ROUTERABI } = require('../abi/ROUTER');
const { STAKERABI } = require('../abi/STAKER');
const PID = require('./PID');

async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const tokenA = pool.underlying_tokens[0];
  const tokenB = pool.underlying_tokens[1];
  const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase());
  const interaction_address = pool.investing_address;
  let method_name = '';
  let args = [];
  const amountADesired = await toBnERC20Decimals(
    amount.amountsDesired[0].humanValue,
    pool.chain,
    pool.underlying_tokens[0]
  );
  const amountBDesired = await toBnERC20Decimals(
    amount.amountsDesired[1].humanValue,
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
      amount.amountsMinimum[tokenPosition].humanValue,
      pool.chain,
      pool.underlying_tokens[tokenPosition]
    );
    const amountNativeMin = await toBnERC20Decimals(
      amount.amountsMinimum[nativePosition].humanValue,
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
      amount.amountsMinimum[0].humanValue,
      pool.chain,
      pool.underlying_tokens[0]
    );
    const amountBMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[1].humanValue,
      pool.chain,
      pool.underlying_tokens[1]
    );
    args = [
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMinimum,
      amountBMinimum,
      addresses.receiverAddress,
      options.deadline,
    ];
  }

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: [amountADesired, amountBDesired],
    },
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
    amount.amountsMinimum[0].humanValue,
    pool.chain,
    pool.underlying_tokens[0]
  );
  const amountBMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[1].humanValue,
    pool.chain,
    pool.underlying_tokens[1]
  );
  const args = [
    tokenA,
    tokenB,
    amountBN,
    amountAMinimum,
    amountBMinimum,
    addresses.receiverAddress,
    options.deadline,
  ];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: amountBN,
    },
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
  const args = [pid, amountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: amountBN,
    },
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
  const method_name = 'withdraw';
  const args = [pid, amountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
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
  const interaction_address = '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652';
  const amountBN = await toBnERC20Decimals(0, pool.chain, pool.pool_address);
  const abi = STAKERABI;
  // Indeed 'deposit' to claim_rewards on Pancake
  const method_name = 'deposit';
  const args = [pid, amountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: amountBN,
    },
  };
}

const interactions: Interactions = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  unstake_and_redeem: null,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
