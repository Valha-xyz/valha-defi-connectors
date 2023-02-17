/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')
const STABI = require('../abi/STMATIC.json')

/// invest
async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = STABI
  const method_name = 'submit'
  const position_token = pool.underlying_tokens[0]
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  const args = [amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
  }
}

/// unlock
async function unlock (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = STABI
  const method_name = 'requestWithdraw'
  const position_token = pool.underlying_tokens[0]
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  const args = [amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
  }
}

/// redeem
// async function redeem(
//   pool_name,
//   chain,
//   underlying_tokens,
//   pool_address,
//   investing_address,
//   staking_address,
//   boosting_address,
//   distributor_address,
//   rewards_tokens,
//   metadata,
//   amountNotBN,
//   userAddress,
//   receiverAddress,
//   lockupTimestamp
// ) {
//   const abi = STABI;
//   const method_name = 'withdraw';
//   const args = [amountBN];

//   return {
//     abi: abi, //json file name
//     method_name: method_name, //method to interact with the pool
//     position_token: underlying_tokens[0], // token needed to approve
//     position_token_type: 'ERC-20', //token type to approve
//     interaction_address: pool_address, // contract to interact with to interact with poolAddress
//     args: args, //args to pass to the smart contracts to trigger 'method_name'
//   };
// }

/// stake
async function stake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {}
}

/// unstake
async function unstake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {}
}

/// boost
async function boost (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {}
}

/// unboost
async function unboost (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {}
}

/// claim
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) {
  return {}
}

const interactions: Interactions = {
  deposit,
  deposit_and_stake: null,
  unlock,
  redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null
}

export default interactions
