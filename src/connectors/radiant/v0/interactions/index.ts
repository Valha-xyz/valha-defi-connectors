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
import { InvestingABI } from '../abi/Investing';
import { RewardsABI } from '../abi/Rewards';

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = InvestingABI;
  const method_name = 'deposit(address,uint256,address,uint16)';
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.underlying_tokens[0]
  );
  if (!amountBN) throw new Error('Error: wrong big number amount conversion.');
  const args = [pool.underlying_tokens[0], amountBN, addresses.userAddress, 0];
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
  const abi = InvestingABI;
  const method_name = 'withdraw(address,uint256,address)';
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address
  );
  if (!amountBN) throw new Error('Error: wrong big number amount conversion.');
  const args = [pool.underlying_tokens[0], amountBN, addresses.userAddress];
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

// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = RewardsABI;
  const method_name = 'claimAll(address)';
  const args = [addresses.userAddress]; // range is 0 to claim Qi, 1 to claim AVAX
  const interaction_address = pool.distributor_address
    ? pool.distributor_address
    : '';

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: null, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: '0',
    },
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
