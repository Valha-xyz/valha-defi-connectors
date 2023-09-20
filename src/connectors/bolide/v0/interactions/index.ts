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
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const method_name = 'depositOnBehalf(uint256,address,address)';
  const position_token = pool.underlying_tokens;

 
  const amountBN = await toBnERC20Decimals(amount,pool.chain,pool.underlying_tokens[0]);

  const args = [amountBN,pool.underlying_tokens[0],addresses.receiverAddress];

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
      amount: amountBN,
    },
  };
}


/// redeem (by redeeming on bolide you also claim fees and rewards)
/// your position can be seen as balanceOf of the pool address (whose also staking address, boosring address)
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const method_name = 'withdraw(uint256,address)';
  const position_token = pool.underlying_tokens[0];
  
  const amountBN = await toBnERC20Decimals(amount,pool.chain,pool.underlying_tokens[0]);

  const args = [amountBN, pool.underlying_tokens[0]];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
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
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const method_name = 'depositBLID(uint256)';
  const position_token = pool.rewards_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.boosting_address, // contract to interact with to interact with poolAddress
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

/// unboost
async function unboost(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const method_name = 'withdrawBLID(uint256)';
  const position_token = pool.rewards_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const args = [amountBN];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.boosting_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: null,
  };
}


/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const method_name = 'claimAllRewardBLID';
  const args = [];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.boosting_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

/// claim
async function claimInterests(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const method_name = 'interestFee(address)';
  const args = [];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.pool_address, // contract to interact with to interact with poolAddress
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
  stake: null,
  unstake: null,
  boost,
  unboost,
  claim_rewards: claimRewards,
  claim_interests: claimInterests,
};

export default interactions;
