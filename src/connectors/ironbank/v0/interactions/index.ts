/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'

import { toBnERC20Decimals } from '../../../../utils/toBNTokenDecimals'
import { PoolABI } from '../abi/Pool'
import { StakingABI } from '../abi/StakingPool'

/// invest
async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolABI
<<<<<<< HEAD
  const method_name = 'mint'
=======
  const method_name = 'mint(uint256)'
>>>>>>> parent of 20cdc2c6 (automatic push)
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.underlying_tokens[0]
  )
  if (!amountBN) throw new Error('Error: wrong big number amount conversion.')
  const args = [amountBN]
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0]
    },
    assetInfo: {
      position_token: pool.underlying_tokens[0], // token needed to approve
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
  const abi = PoolABI
<<<<<<< HEAD
  const method_name = 'redeem'
=======
  const method_name = 'redeem(uint256)'
>>>>>>> parent of 20cdc2c6 (automatic push)
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address
  )
  const args = [amountBN]
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0]
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
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
  const abi = StakingABI
<<<<<<< HEAD
  const method_name = 'stake'
=======
  const method_name = 'stake(uint256)'
>>>>>>> parent of 20cdc2c6 (automatic push)
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
      interaction_address: pool.staking_address ? pool.staking_address : '', // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0]
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN || '0'
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
  const abi = StakingABI
<<<<<<< HEAD
  const method_name = 'withdraw'
=======
  const method_name = 'withdraw(uint256)'
>>>>>>> parent of 20cdc2c6 (automatic push)
  const position_token = pool.pool_address ? pool.pool_address : ''
  console.log(position_token)
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  if (!amountBN) throw new Error('Error: wrong big number amount conversion.')
  const args = [amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address ? pool.staking_address : '', // contract to interact with to interact with poolAddress
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

/// claim
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = StakingABI
  const method_name = 'getReward()'
  const args = []

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address ? pool.staking_address : '', // contract to interact with to interact with poolAddress
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
