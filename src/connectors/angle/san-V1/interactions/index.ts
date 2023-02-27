/* eslint-disable @typescript-eslint/no-var-requires */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'

const { SanPoolABI } = require('../abi/SanToken')
const { StakingABI } = require('../abi/StakingPool')
const { StableABI } = require('../abi/StableMaster')
const ethers = require('ethers')
const { getNodeProvider } = require('../../../../utils/getNodeProvider')
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')

async function getSanPoolManager (poolAddress) {
  try {
    const provider = await getNodeProvider('ethereum')
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, SanPoolABI, provider)
    const poolManagerAddress = await POOL.poolManager()
    return poolManagerAddress
  } catch (err) {
    console.log(err)
    return null
  }
}

/// invest
async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = StableABI
  const method_name = 'deposit'
  const poolManager = await getSanPoolManager(pool.pool_address)
  if (!poolManager) throw new Error('Angle pool manager was not found')
  const position_token = pool.underlying_tokens[0]
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  const args = [amountBN, addresses.userAddress, poolManager]

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
  const abi = StableABI
  const method_name = 'withdraw'
  const poolManager11 = await getSanPoolManager(pool.pool_address)
  if (!poolManager11) throw new Error('Angle pool manager was not found')
  const position_token = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount.humanValue,
    pool.chain,
    position_token
  )
  const args = [
    amountBN,
    addresses.receiverAddress,
    addresses.userAddress,
    poolManager11
  ]

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
  const abi = StakingABI
  const method_name = 'deposit'
  const position_token = pool.pool_address
  let args = []
  let amountBN = ''
  if (pool.staking_address) {
    amountBN = await toBnERC20Decimals(
      amount.amount.humanValue,
      pool.chain,
      position_token
    )
    args = [amountBN, addresses.userAddress]
  } else {
    args = ['0', addresses.userAddress]
  }

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
  const abi = StakingABI
  const method_name = 'withdraw'
  const position_token = pool.staking_address
  let args = []
  let amountBN = ''
  if (pool.staking_address) {
    amountBN = await toBnERC20Decimals(
      amount.amount.humanValue,
      pool.chain,
      position_token
    )
    args = [amountBN]
  } else {
    args = ['0']
  }

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

/// claim
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = StakingABI
  const method_name = 'claim_rewards'
  const args = [addresses.userAddress]

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
