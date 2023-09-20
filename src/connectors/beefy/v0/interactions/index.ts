/* eslint-disable @typescript-eslint/no-var-requires */

import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')

/* eslint-disable @typescript-eslint/no-unused-vars */
const { VaultABI } = require('../abi/beefy_vault')

/// invest
async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = VaultABI
  const method_name = 'deposit'
  const position_token = pool.underlying_tokens[0]
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  const args = [amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0]
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
  }
}

async function depositAll (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = VaultABI
  const method_name = 'depositAll'
  const position_token = pool.underlying_tokens[0]
  const provider = await getNodeProvider(pool.chain)
  const args = []
  const amountToApprove = '1000000000000000000000000000'

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
      amount: amountToApprove // userBalance.toString(),
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
  const abi = VaultABI
  const method_name = 'withdraw'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  const args = [amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0]
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
  }
}

async function redeemAll (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = VaultABI
  const method_name = 'withdrawAll'
  const position_token = pool.pool_address
  const provider = await getNodeProvider(pool.chain)
  const amountToApprove = '1000000000000000000000000000'
  const args = []

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
      amount: amountToApprove
    }
  }
}

const interactions: Interactions = {
  deposit,
  deposit_and_stake: null,
  deposit_all: depositAll,
  unlock: null,
  redeem,
  redeem_all: redeemAll,
  unstake_and_redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null
}

export default interactions
function getNodeProvider (chain: string) {
  throw new Error('Function not implemented.')
}
