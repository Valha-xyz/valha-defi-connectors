/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  InteractionFunctionNames,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { eTokenABI } from '../abi/euler_etoken'
import { stakeABI } from '../abi/euler_staking'
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')

/// invest
async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = eTokenABI
  const method_name = 'deposit'
  const position_token = pool.underlying_tokens[0]
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  const args = [options?.other?.subAccountId ?? 0, amountBN]

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
async function redeem (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = eTokenABI
  const method_name = 'withdraw'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  // Here we could check if amountBN is undefined. The contract allows for passing the max number value to withdraw all
  const args = [options?.other?.subAccountId ?? 0, amountBN]

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

/// stake
async function stake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = stakeABI
  const method_name = 'stake'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  const args = [options?.other?.subAccountId ?? 0, amountBN]
  const interaction_address = pool.staking_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
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

/// unstake
async function unstake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = stakeABI
  const method_name = 'withdraw'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  const args = [options?.other?.subAccountId ?? 0, amountBN]
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null
  }
}

/// claimRewards
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = stakeABI
  const method_name = 'getReward'
  const args = []
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null
  }
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
  claim_interests: null
}
export default interactions
