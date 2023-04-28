/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers'
import { toBnERC20Decimals } from '../../../../utils/toBNTokenDecimals'
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'
import { NFT_POSITION_MANAGER_ABI } from '../abi/nft-position-manager'

// https://github.com/Uniswap/v3-core/blob/d8b1c635c275d2a9450bd6a78f3fa2484fef73eb/contracts/libraries/TickMath.sol#L7
const MIN_TICK = -887272;
const MAX_TICK = -MIN_TICK;

const FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

/// init
async function initialize (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {

  const abi = NFT_POSITION_MANAGER_ABI;
  // Mint a new position

  // We need to know where to deposit the liquidity. We do so in the pool with the highest liquidity (for safety)

  const amount0Desired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0]
  )
  const amount1Desired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1]
  )
  const amount0Min = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.underlying_tokens[0]
  )
  const amount1Min = await toBnERC20Decimals(
    amount.amountsMinimum[1],
    pool.chain,
    pool.underlying_tokens[1]
  )

  const mintParams = {
      token0: pool.underlying_tokens[0],
      token1: pool.underlying_tokens[1],
      fee: pool.metadata.fee,
      tickLower: options?.rangeToken ?? MIN_TICK,
      tickUpper:options?.rangeToken ?? MAX_TICK,
      amount0Desired,
      amount1Desired,
      amount0Min,
      amount1Min,
      recipient: addresses.receiverAddress,
      deadline: options?.deadline,
  };

  const method_name = "mint";
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args: [mintParams], // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [5, 6] 
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amount0Desired, amount1Desired]
    }
  }
}

/// invest
async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {

  const abi = NFT_POSITION_MANAGER_ABI;

  const amount0Desired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0]
  )
  const amount1Desired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1]
  )
  const amount0Min = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.underlying_tokens[0]
  )
  const amount1Min = await toBnERC20Decimals(
    amount.amountsMinimum[1],
    pool.chain,
    pool.underlying_tokens[1]
  )

  if(!options?.rangeToken){
    throw "Can't deposit without the tokenId for Uniswap"
  }

  const increaseParams = {
      tokenId: options?.rangeToken,
      amount0Desired,
      amount1Desired,
      amount0Min,
      amount1Min,
      deadline: options?.deadline,
  };

  const method_name = "increaseLiquidity";
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args: [increaseParams], // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1, 2]
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amount0Desired, amount1Desired]
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
  const abi = NFT_POSITION_MANAGER_ABI;

  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address[0]
  )
  const amount0Min = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.underlying_tokens[0]
  )
  const amount1Min = await toBnERC20Decimals(
    amount.amountsMinimum[1],
    pool.chain,
    pool.underlying_tokens[1]
  )

  if(!options?.rangeToken){
    throw "Can't deposit without the tokenId for Uniswap"
  }

  const decreaseParams = {
      tokenId: options?.rangeToken,
      liquidity: amountBN,
      amount0Min,
      amount1Min,
      deadline: options?.deadline,
  };

  const method_name = "decreaseLiquidity";
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args: [decreaseParams], // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1] 
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountBN]
    }
  }
}


/// claimRewards
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {

  const abi = NFT_POSITION_MANAGER_ABI;

  if(!options?.rangeToken){
    throw "Can't claim without the tokenId for Uniswap"
  }

  const maxUint128 = "340282366920938463463374607431768211455"

  const collectParams = {
      tokenId: options?.rangeToken,
      recipient: addresses.receiverAddress,
      amount0Max: maxUint128,
      amount1Max: maxUint128,
  };

  const method_name = "collect";
  const interaction_address = pool.investing_address

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args: [collectParams], // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: []
    },
    assetInfo: {
      position_token: [], // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: []
    }
  }
}

const interactions: Interactions = {
  initialize,
  deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  unstake_and_redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null
}

export default interactions
