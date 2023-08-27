/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';
const { ROUTERABI } = require('../abi/Router');
const { LPSTAKING } = require('../abi/LPStaking');
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const STAKING_PID = require('./STAKINGPID');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const size = pool.underlying_tokens.length;
  const abi = ROUTERABI;
  const method_name = `addLiquidity(uint256[${size}],uint256,uint256)`;
  const position_token = pool.underlying_tokens;

  const amountsBN = [];
  for (const i in pool.underlying_tokens) {
    const amountBN = await toBnERC20Decimals(
      amount.amountsDesired[i],
      pool.chain,
      pool.underlying_tokens[i]
    );
    amountsBN.push(amountBN);
  }

  const amountMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.pool_address
  );

  const args = [amountsBN, amountMinimum,options.deadline];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountsBN,
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
  const size = pool.underlying_tokens.length;
  const abi = ROUTERABI;
  const method_name = `removeLiquidity(uint256,uint256[${size}],uint256)`;
  const position_token = pool.pool_address;
  const amountsBN = [];

  for (const i in pool.underlying_tokens) {
    pool.underlying_tokens[i];
    const amountBN = await toBnERC20Decimals(
      amount.amountsMinimum[i],
      pool.chain,
      pool.underlying_tokens[i]
    );
    amountsBN.push(amountBN);
  };

  const amountDesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    position_token
  );
  const args = [amountDesired, amountsBN, options.deadline];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: {
      position_token: [position_token], // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountDesired],
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
  const poolId = STAKING_PID[pool.chain][pool.pool_address.toLowerCase()];
  const abi = LPSTAKING;
  const method_name = 'deposit(uint256,uint256,address)';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const args = [poolId, amountBN, addresses.receiverAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1],
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
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
  const poolId = STAKING_PID[pool.chain][pool.pool_address.toLowerCase()];
  const abi = LPSTAKING;
  const method_name = 'withdraw(uint256,uint256,address)';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const args = [poolId, amountBN, addresses.receiverAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1],
    },
    assetInfo: null,
  };
}

/// boost
async function boost(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {};
}

/// unboost
async function unboost(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {};
}

/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const poolId = STAKING_PID[pool.chain][pool.pool_address.toLowerCase()];
  const abi = LPSTAKING;
  const method_name = 'Harvest(uint256,address)';
  const args = [poolId, addresses.receiverAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

const interactions: Interactions = {
  deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  unstake_and_redeem: null,
  stake,
  unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
