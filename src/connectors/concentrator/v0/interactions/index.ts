/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';

import {POOLABI} from "../abi/pool";
import { toBnERC20Decimals } from '../../../..//utils/toBNTokenDecimals';

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const method_name = 'depositWithCRV';
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  const minAmount =
    amount.amountsMinimum?.[0] ?? (parseFloat(amount.amount) * 0.995).toString();

  const poolToken = pool.pool_address;
  const amountMin = await toBnERC20Decimals(
    minAmount,
    pool.chain,
    poolToken,
  );
  const args = [amountBN, addresses.receiverAddress , amountMin];

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

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const method_name = 'withdraw';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  
  const args = [amountBN, addresses.receiverAddress, addresses.userAddress];

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

const interactions: Interactions = {
  deposit,
  deposit_all: null,
  redeem_all: null,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  unstake_and_redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null,
};

export default interactions;
