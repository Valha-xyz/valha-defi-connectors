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

const { VaultABI } = require('../abi/Vault')
const { StakingABI } = require('../abi/FairLaunch')
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')
const PID = require('./PID')

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

/// unlock
async function unlock () {
  return {}
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

/// stake
async function stake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const poolId = PID[pool.pool_address.toLowerCase()]
  const abi = StakingABI
  const method_name = 'deposit'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  const args = [addresses.userAddress, poolId, amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [2]
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
  const poolId = PID[pool.pool_address.toLowerCase()]
  const abi = StakingABI
  const method_name = 'withdraw'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  const args = [addresses.userAddress, poolId, amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [2]
    },
    assetInfo: null
  }
}

/// claim
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = StakingABI
  const method_name = 'harvest'
  const poolId = PID[pool.pool_address.toLowerCase()]
  const args = [poolId]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
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
