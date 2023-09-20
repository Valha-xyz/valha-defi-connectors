/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'
import { SwapABI } from '../abi/Swap'
import { MasterABI } from '../abi/Master'
import { CAKE_PID } from '../pools/CAKEPID'
const ethers = require('ethers')
const { getNodeProvider } = require('../../../../utils/getNodeProvider')
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')

/// invest
async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const size = pool.underlying_tokens.length
  let abi: any
  if (size === 2) {
    abi = SwapABI
  } else {
    throw new Error('Error: pool size is not handle.')
  }
  const method_name = 'add_liquidity'
  const position_token = pool.underlying_tokens
  const amountsBN = []
  for (const i in pool.underlying_tokens) {
    const amountBN = await toBnERC20Decimals(
      amount.amountsDesired[i],
      pool.chain,
      pool.underlying_tokens[i]
    )
    amountsBN.push(amountBN)
  }
  const amountMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.pool_address
  )
  const args = [amountsBN, amountMinimum]

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
      amount: amountsBN
    }
  }
}

/// invest
async function redeem (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const size = pool.underlying_tokens.length
  let abi: any
  if (size === 2) {
    abi = SwapABI
  } else {
    throw new Error('Error: pool size is not handle.')
  }
  const method_name = 'remove_liquidity'
  const position_token = pool.pool_address
  const amountsBN = []
  for (const i in pool.underlying_tokens) {
    pool.underlying_tokens[i]
    const amountBN = await toBnERC20Decimals(
      amount.amountsMinimum[i],
      pool.chain,
      pool.underlying_tokens[i]
    )
    amountsBN.push(amountBN)
  }
  const amountDesired = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  const args = [amountDesired, amountsBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: [position_token], // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountDesired]
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
  const poolId = CAKE_PID[pool.pool_address.toLowerCase()]
  const abi = MasterABI
  const method_name = 'deposit'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  const args = [poolId, amountBN]

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
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
  const poolId = CAKE_PID[pool.pool_address.toLowerCase()]
  const abi = MasterABI
  const method_name = 'withdraw'
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  )
  const args = [poolId, amountBN]

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

/// claim
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const poolId = CAKE_PID[pool.pool_address.toLowerCase()]
  const abi = MasterABI
  const method_name = 'withdraw'
  const args = [poolId, '0']

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
  deposit_all: null,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  redeem_all: null,
  unstake_and_redeem: null,
  stake,
  unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null
}

export default interactions
