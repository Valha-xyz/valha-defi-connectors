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
  
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  import { PoolsABI } from '../abi/Pool'
  import { toBnERC20Decimals } from '../../../../utils/toBNTokenDecimals'
  
  /// invest
  async function deposit (
    pool: Pool,
    amount: AmountInput,
    addresses: AddressesInput,
    options?: AdditionalOptions
  ): Promise<InteractionsReturnObject> {
    const abi = PoolABI
    const method_name = 'deposit(uint256,address)'
    const position_token = pool.underlying_tokens[0]
    const amountBN = await toBnERC20Decimals(
      amount.amount,
      pool.chain,
      position_token
    )
    const args = [amountBN, addresses.userAddress]
  
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
    const abi = PoolABI
    const method_name = 'withdraw(uint256,address,address)'
    const position_token = pool.pool_address
    const amountBN = await toBnERC20Decimals(
      amount.amount,
      pool.chain,
      position_token
    )
    const args = [amountBN, addresses.userAddress, addresses.userAddress]
  
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
  
  /// claimRewards
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
    unlock: null,
    redeem,
    unstake_and_redeem: null,
    stake: null,
    unstake: null,
    boost: null,
    unboost: null,
    claim_rewards: null,
    claim_interests: null
  }
  
  export default interactions