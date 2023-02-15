/* eslint-disable @typescript-eslint/no-var-requires */
import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from '../../../../utils/types/connector-types';

import { toBnERC20Decimals } from '../../../../utils/toBNTokenDecimals';
import { PoolABI } from '../abi/Pool';

/// invest
async function depositAndStake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolABI;
  const PID = '';
  const method_name = 'deposit(uint256, uint256, bool)';
  const positionToken = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [PID, amountBN, true];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: amountBN,
    },
  };
}

async function unstakeAndRedeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolABI;
  const PID = '';
  const method_name = 'withdraw(uint256, uint256, bool)';
  const positionToken = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [PID, amountBN, true];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: amountBN,
    },
  };
}

async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolABI;
  const method_name = 'getReward()';
  const positionToken = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    positionToken
  );
  const args = [amountBN, true];
  const interaction_address = pool.staking_address;

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: null, // token needed to approve
      position_token_type: null, //token type to approve
      amount: '0',
    },
  };
}

const interactions: Interactions = {
  deposit: null,
  deposit_and_stake: depositAndStake,
  unlock: null,
  redeem: null,
  unstake_and_redeem: unstakeAndRedeem,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
