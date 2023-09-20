/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getNodeProvider } from '../../../../utils/getNodeProvider';
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';
import { ethers } from 'ethers';
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const { POOLABI } = require('../abi/POOL');
const { GAUGEABI } = require('../abi/GAUGE');
const PID = require('./STAKINGPID');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase());
  let method_name = '';
  let args: string[] = [];
  const amountADesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0],
  );
  const amountBDesired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1],
  );

  if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
    method_name = 'depositNative(uint256,uint256)';
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
      pool.underlying_tokens[tokenPosition],
    );
    args = [amountMin, amountDesired];
  } else {
    method_name = 'deposit(uint256,uint256)';
    args = [amountADesired, amountBDesired];
  }

  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0, 1],
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountADesired, amountBDesired],
    },
  };
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;

  const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase());
  let method_name = '';
  let args: string[] = [];

  const interaction_address = pool.investing_address;

  const provider = getNodeProvider(pool.chain);
  const InvestingPool = new ethers.Contract(interaction_address, abi, provider);

  const round = await InvestingPool.getCurrentRound();
  if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
    method_name = 'redeemQueuedWithdrawalNative(uint256,address)';
    args = [round, addresses.userAddress];
  } else {
    method_name = 'redeemQueuedWithdrawal(uint256,address)';
    args = [round, addresses.userAddress];
  }

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [],
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: '0',
    },
  };
}

/// stake
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const interaction_address = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address,
  );
  const info = await PID(pool.chain, pool.staking_address, pool.pool_address);
  if (info.err) throw new Error(info.err);
  const poolId = info.data;
  const abi = GAUGEABI;
  const method_name = 'deposit(uint256,uint256)';
  const args = [poolId, amountBN];

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1],
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
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
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const interaction_address = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address,
  );
  const abi = GAUGEABI;
  const info = await PID(pool.chain, pool.staking_address, pool.pool_address);
  if (info.err) throw new Error(info.err);
  const poolId = info.data;
  const method_name = 'withdraw(uint256,uint256)';
  const args = [poolId, amountBN];

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1],
    },
    assetInfo: null,
  };
}

/// claim rewards
async function claim_rewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const interaction_address = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address,
  );
  const abi = GAUGEABI;
  const info = await PID(pool.chain, pool.staking_address, pool.pool_address);
  if (info.err) throw new Error(info.err);
  const poolId = info.data;
  const method_name = 'harvestRewards(uint256[])';
  const args = [poolId];

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [],
    },
    assetInfo: null,
  };
}

/// unlock
async function unlock(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const interaction_address = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address,
  );
  const abi = POOLABI;
  const method_name = 'queueWithdrawal(uint256,address)';
  const args = [amountBN, addresses.receiverAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

const interactions: Interactions = {
  deposit,
  deposit_and_stake: null,
  unlock,
  redeem,
  unstake_and_redeem: null,
  stake,
  unstake,
  boost: null,
  unboost: null,
  claim_rewards,
  claim_interests: null,
};

export default interactions;
