/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';

/* eslint-disable @typescript-eslint/no-unused-vars */

import { BatchABI } from '../abi/batch';
import { CLAIMABI } from '../abi/claim';
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

const ACTION_ID = {
  deposit: '4',
  redeem: '5',
};

const CURRENCY_ID = {
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 1, //eth
  '0x6b175474e89094c44da98b954eedeac495271d0f': 2, //dai
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 3, //usdc
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': 4, //wbtc
};

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = BatchABI;
  const method_name = 'batchBalanceAction';
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );

  const batchAction = [
    {
      actionType: ACTION_ID['deposit'],
      currencyId: CURRENCY_ID[pool.underlying_tokens[0].toLowerCase()],
      depositActionAmount: amountBN,
      withdrawAmountInternalPrecision: '0',
      withdrawEntireCashBalance: false,
      redeemToUnderlying: false,
    },
  ];

  const args = [addresses.receiverAddress, batchAction];

  return {
    txInfo: {
      abi, // json file name
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

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = BatchABI;
  const method_name = 'batchBalanceAction';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );

  const batchAction = [
    {
      actionType: ACTION_ID['redeem'],
      currencyId: CURRENCY_ID[pool.underlying_tokens[0].toLowerCase()],
      depositActionAmount: amountBN,
      withdrawAmountInternalPrecision: '0',
      withdrawEntireCashBalance: true,
      redeemToUnderlying: true,
    },
  ];

  const args = [addresses.receiverAddress, batchAction];

  return {
    txInfo: {
      abi, // json file name
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

/// claim
async function claim_rewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = CLAIMABI;
  const method_name = 'nTokenClaimIncentives';
  const args = [];

  return {
    txInfo: {
      abi, // json file name
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [],
    },
    assetInfo: null,
  };
}

const contractInteractions: Interactions = {
  deposit,
  deposit_all: null,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  redeem_all: null,
  unstake_and_redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards,
  claim_interests: null,
};

export default contractInteractions;
