/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';
import { StableABI2 } from './../abi/Stable2';
import { StableABI3 } from './../abi/Stable3';
import { StableABI4 } from './../abi/Stable4';
import { GaugeABI } from '../abi/Gauge';
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const size = pool.underlying_tokens.length;

  let abi: any;
  if (pool.metadata.abi) {
    abi = JSON.parse(pool.metadata.abi);
  } else if (size === 2) {
    abi = StableABI2;
  } else if (size === 3) {
    abi = StableABI3;
  } else if (size === 4) {
    abi = StableABI4;
  } else {
    throw new Error('Error: pool size is not handle.');
  }
  const method_name = `add_liquidity(uint256[${size}],uint256)`;
  const position_token = pool.underlying_tokens;
  const amountsBN = [];
  for (const i in pool.underlying_tokens) {
    const amountBN = await toBnERC20Decimals(
      amount.amountsDesired[i],
      pool.chain,
      pool.underlying_tokens[i],
    );
    amountsBN.push(amountBN);
  }
  const amountMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.pool_address,
  );
  const args = [amountsBN, amountMinimum];

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

/// invest
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const size = pool.underlying_tokens.length;
  let abi: any;
  if (pool.metadata.abi) {
    abi = JSON.parse(pool.metadata.abi);
  } else if (size === 2) {
    abi = StableABI2;
  } else if (size === 3) {
    abi = StableABI3;
  } else if (size === 4) {
    abi = StableABI4;
  } else {
    throw new Error('Error: pool size is not handle.');
  }
  const method_name = `remove_liquidity(uint256,uint256[${size}])`;
  const position_token = pool.pool_address;
  const amountsBN = [];
  for (const i in pool.underlying_tokens) {
    pool.underlying_tokens[i];
    const amountBN = await toBnERC20Decimals(
      amount.amountsMinimum[i],
      pool.chain,
      pool.underlying_tokens[i],
    );
    amountsBN.push(amountBN);
  }

  const amountDesired = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  const args = [amountDesired, amountsBN];
  console.log(args);

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
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = GaugeABI;
  const method_name = 'deposit(uint256,address)';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  const args = [amountBN, addresses.userAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
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
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = GaugeABI;
  const position_token = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  let method_name: string;
  let args = [];
  if (pool.chain === 'ethereum') {
    method_name = 'withdraw(uint256)';
    args = [amountBN];
  } else {
    method_name = 'withdraw(uint256,address)';
    args = [amountBN, addresses.receiverAddress];
  }

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = GaugeABI;
  const method_name = 'claim_rewards(address)';
  const args = [addresses.userAddress];

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
