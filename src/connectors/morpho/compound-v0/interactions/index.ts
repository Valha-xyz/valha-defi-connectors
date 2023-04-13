/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';

import { toBnERC20Decimals } from '../../../../utils/toBNTokenDecimals';
import { PoolABI } from '../abi/Pool';
import { MorphoABI } from '../abi/Morpho';

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolABI;
  const method_name = 'deposit';
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.underlying_tokens[0]
  );
  const args = [amountBN, addresses.receiverAddress];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: {
      position_token: pool.underlying_tokens[0], // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
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
  const abi = PoolABI;
  const method_name = 'redeem';
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address
  );
  const args = [amountBN, addresses.receiverAddress, addresses.userAddress];
  const interaction_address = pool.investing_address;

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

/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = MorphoABI;
  const method_name = 'claimRewards';
  const cToken = pool.metadata.cTokenAddress;
  const args = [[cToken], true];
  const interaction_address = pool.distributor_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
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
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
