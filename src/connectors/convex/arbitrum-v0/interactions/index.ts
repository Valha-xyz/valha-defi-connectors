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
import { InvestABI } from '../abi/Invest'
import INVEST_PID from './INVESTPID'

/// invest
async function depositAndStake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = InvestABI
  const PID = INVEST_PID[pool.chain][pool.pool_address.toLowerCase()]
  const method_name = 'deposit'
  const positionToken = pool.underlying_tokens[0]
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    positionToken
  )
  const args = [PID, amountBN]
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1]
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
  }
}

async function unstakeAndRedeem (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = InvestABI
  const PID = INVEST_PID[pool.chain][pool.pool_address.toLowerCase()]
  const method_name = 'withdrawTo'
  const positionToken = pool.pool_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    positionToken
  )
  const args = [PID, amountBN, addresses.userAddress]
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1]
    },
    assetInfo: {
      position_token: positionToken, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
  }
}

async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolABI
  const method_name = 'getReward'
  const args = [addresses.userAddress]
  console.log(pool)
  const interaction_address = pool.staking_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: null, // token needed to approve
      position_token_type: null, // token type to approve
      amount: '0'
    }
  }
}

const interactions: Interactions = {
  deposit: null,
  deposit_and_stake: depositAndStake,
  unlock: null,
  redeem: null,
  unstake_and_redeem: unstakeAndRedeem,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null
}

export default interactions
