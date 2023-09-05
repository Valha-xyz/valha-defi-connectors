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
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const { POOLABI } = require('../abi/DepositPool');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const method_name = 'deposit';
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const args = [];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

/// redeem


const interactions: Interactions = {
  deposit,
  deposit_all: null,
  deposit_and_stake: null,
  unlock: null,
  redeem: null,
  redeem_all: null,
  unstake_and_redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null,
};

export default interactions;
