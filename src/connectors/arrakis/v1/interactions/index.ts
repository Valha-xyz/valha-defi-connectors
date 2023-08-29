/* eslint-disable @typescript-eslint/no-var-requires */

import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool
} from '../../../../utils/types/connector-types'

/* eslint-disable @typescript-eslint/no-unused-vars */
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')
const { ROUTERABI } = require('../abi/ROUTERABI')

async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI
  const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase())
  const interaction_address = pool.investing_address
  let method_name = ''
  let args = []
  const amountADesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0]
  )
  const amountBDesired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1]
  )

  const amountSharesMin = 0

  if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
    method_name = 'addLiquidityETH'
    let amountDesired
    let nativePosition
    let tokenPosition
    if (tokens[0] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 0
      tokenPosition = 1
      amountDesired = amountADesired
    }
    if (tokens[1] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 1
      tokenPosition = 0
      amountDesired = amountBDesired
    }
    const amountMin = await toBnERC20Decimals(
      amount.amountsMinimum[tokenPosition],
      pool.chain,
      pool.underlying_tokens[tokenPosition]
    )
    const amountNativeMin = await toBnERC20Decimals(
      amount.amountsMinimum[nativePosition],
      pool.chain,
      pool.underlying_tokens[nativePosition]
    )
    args = [
      pool.pool_address,
      amountDesired,
      amountMin,
      amountNativeMin,
      amountSharesMin,
      addresses.receiverAddress
    ]
  } else {
    method_name = 'addLiquidity'
    const amountAMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[0],
      pool.chain,
      pool.underlying_tokens[0]
    )
    const amountBMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[1],
      pool.chain,
      pool.underlying_tokens[1]
    )
    args = [
      pool.pool_address,
      amountADesired,
      amountBDesired,
      amountAMinimum,
      amountBMinimum,
      amountSharesMin,
      addresses.receiverAddress
    ]
  }

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1, 2]
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountADesired, amountBDesired]
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
  const abi = ROUTERABI
  const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase())
  const interaction_address = pool.investing_address
  let method_name = ''
  let args = []
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address
  )
  const amountADesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0]
  )
  const amountBDesired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1]
  )
  if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
    method_name = 'removeLiquidityETH'
    let amountDesired
    let nativePosition
    let tokenPosition
    if (tokens[0] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 0
      tokenPosition = 1
      amountDesired = amountADesired
    }
    if (tokens[1] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 1
      tokenPosition = 0
      amountDesired = amountBDesired
    }
    const amountMin = await toBnERC20Decimals(
      amount.amountsMinimum[tokenPosition],
      pool.chain,
      pool.underlying_tokens[tokenPosition]
    )
    const amountNativeMin = await toBnERC20Decimals(
      amount.amountsMinimum[nativePosition],
      pool.chain,
      pool.underlying_tokens[nativePosition]
    )
    args = [
      pool.pool_address,
    amountBN,
    amountNativeMin,
    amountMin,
    addresses.receiverAddress,
    ]
  } else {
    method_name = 'removeLiquidity'
    const amountAMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[0],
      pool.chain,
      pool.underlying_tokens[0]
    )
    const amountBMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[1],
      pool.chain,
      pool.underlying_tokens[1]
    )

    args = [
      pool.pool_address,
      amountBN,
      amountAMinimum,
      amountBMinimum,
      addresses.receiverAddress,
    ]
  }

  

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1]
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
  }
}

// async function deposit_and_stake (
//   pool: Pool,
//   amount: AmountInput,
//   addresses: AddressesInput,
//   options?: AdditionalOptions
// ): Promise<InteractionsReturnObject> {
//   const abi = ROUTERABI
//   const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase())
//   const interaction_address = pool.investing_address
//   let method_name = ''
//   let args = []
//   const amountADesired = await toBnERC20Decimals(
//     amount.amountsDesired[0],
//     pool.chain,
//     pool.underlying_tokens[0]
//   )
//   const amountBDesired = await toBnERC20Decimals(
//     amount.amountsDesired[1],
//     pool.chain,
//     pool.underlying_tokens[1]
//   )

//   const amountSharesMin = 0

//   if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
//     method_name = 'addLiquidityETHAndStake'
//     let amountDesired
//     let nativePosition
//     let tokenPosition
//     if (tokens[0] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//       nativePosition = 0
//       tokenPosition = 1
//       amountDesired = amountADesired
//     }
//     if (tokens[1] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//       nativePosition = 1
//       tokenPosition = 0
//       amountDesired = amountBDesired
//     }
//     const amountMin = await toBnERC20Decimals(
//       amount.amountsMinimum[tokenPosition],
//       pool.chain,
//       pool.underlying_tokens[tokenPosition]
//     )
//     const amountNativeMin = await toBnERC20Decimals(
//       amount.amountsMinimum[nativePosition],
//       pool.chain,
//       pool.underlying_tokens[nativePosition]
//     )
//     args = [
//       pool.staking_address,
//       amountDesired,
//       amountMin,
//       amountNativeMin,
//       amountSharesMin,
//       addresses.receiverAddress
//     ]
//   } else {
//     method_name = 'addLiquidityAndStake'
//     const amountAMinimum = await toBnERC20Decimals(
//       amount.amountsMinimum[0],
//       pool.chain,
//       pool.underlying_tokens[0]
//     )
//     const amountBMinimum = await toBnERC20Decimals(
//       amount.amountsMinimum[1],
//       pool.chain,
//       pool.underlying_tokens[1]
//     )
//     args = [
//       pool.staking_address,
//       amountADesired,
//       amountBDesired,
//       amountAMinimum,
//       amountBMinimum,
//       amountSharesMin,
//       addresses.receiverAddress
//     ]
//   }

//   return {
//     txInfo: {
//       abi, // abi array
//       interaction_address, // contract to interact with to interact with poolAddress
//       method_name, // method to interact with the pool
//       args, // args to pass to the smart contracts to trigger 'method_name'
//       amountPositions: [1, 2]
//     },
//     assetInfo: {
//       position_token: pool.underlying_tokens, // token needed to approve
//       position_token_type: 'ERC-20', // token type to approve
//       amount: [amountADesired, amountBDesired]
//     }
//   }
// }

// async function unstake_and_redeem (
//   pool: Pool,
//   amount: AmountInput,
//   addresses: AddressesInput,
//   options?: AdditionalOptions
// ): Promise<InteractionsReturnObject> {
//   const abi = ROUTERABI
//   const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase())
//   const interaction_address = pool.investing_address
//   let method_name = ''
//   let args = []
//   const amountBN = await toBnERC20Decimals(
//     amount.amount,
//     pool.chain,
//     pool.pool_address
//   )
//   const amountADesired = await toBnERC20Decimals(
//     amount.amountsDesired[0],
//     pool.chain,
//     pool.underlying_tokens[0]
//   )
//   const amountBDesired = await toBnERC20Decimals(
//     amount.amountsDesired[1],
//     pool.chain,
//     pool.underlying_tokens[1]
//   )
//   if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
//     method_name = 'removeLiquidityETHAndUnstake'
//     let amountDesired
//     let nativePosition
//     let tokenPosition
//     if (tokens[0] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//       nativePosition = 0
//       tokenPosition = 1
//       amountDesired = amountADesired
//     }
//     if (tokens[1] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//       nativePosition = 1
//       tokenPosition = 0
//       amountDesired = amountBDesired
//     }
//     const amountMin = await toBnERC20Decimals(
//       amount.amountsMinimum[tokenPosition],
//       pool.chain,
//       pool.underlying_tokens[tokenPosition]
//     )
//     const amountNativeMin = await toBnERC20Decimals(
//       amount.amountsMinimum[nativePosition],
//       pool.chain,
//       pool.underlying_tokens[nativePosition]
//     )
//     args = [
//     pool.staking_address,
//     amountBN,
//     amountNativeMin,
//     amountMin,
//     addresses.receiverAddress,
//     ]
//   } else {
//     method_name = 'removeLiquidityAndUnstake'
//     const amountAMinimum = await toBnERC20Decimals(
//       amount.amountsMinimum[0],
//       pool.chain,
//       pool.underlying_tokens[0]
//     )
//     const amountBMinimum = await toBnERC20Decimals(
//       amount.amountsMinimum[1],
//       pool.chain,
//       pool.underlying_tokens[1]
//     )

//     args = [
//       pool.staking_address,
//       amountBN,
//       amountAMinimum,
//       amountBMinimum,
//       addresses.receiverAddress,
//     ]
//   }

  

//   return {
//     txInfo: {
//       abi, // abi array
//       interaction_address, // contract to interact with to interact with poolAddress
//       method_name, // method to interact with the pool
//       args, // args to pass to the smart contracts to trigger 'method_name'
//       amountPositions: [1]
//     },
//     assetInfo: {
//       position_token: pool.pool_address, // token needed to approve
//       position_token_type: 'ERC-20', // token type to approve
//       amount: amountBN
//     }
//   }
// }

// async function stake (
//   pool: Pool,
//   amount: AmountInput,
//   addresses: AddressesInput,
//   options?: AdditionalOptions
// ): Promise<InteractionsReturnObject> {
//   const abi = STAKINGABI
//   const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase())
//   const interaction_address = pool.staking_address
//   const method_name = 'deposit'
//   const amountBN = await toBnERC20Decimals(
//     amount.amount,
//     pool.chain,
//     pool.pool_address
//   )
  
//   const args = [
//       amountBN,
//       addresses.receiverAddress,
//       options.other
//     ]

//     return {
//       txInfo: {
//         abi, // abi array
//         interaction_address, // contract to interact with to interact with poolAddress
//         method_name, // method to interact with the pool
//         args, // args to pass to the smart contracts to trigger 'method_name'
//         amountPositions: [0]
//       },
//       assetInfo: {
//         position_token: pool.pool_address, // token needed to approve
//         position_token_type: 'ERC-20', // token type to approve
//         amount: [amountBN]
//       }
//     }
// }

// async function unstake (
//     pool: Pool,
//     amount: AmountInput,
//     addresses: AddressesInput,
//     options?: AdditionalOptions
//   ): Promise<InteractionsReturnObject> {
//     const abi = STAKINGABI
//     const interaction_address = pool.staking_address
//     const method_name = 'withdraw'
//     const amountBN = await toBnERC20Decimals(
//       amount.amount,
//       pool.chain,
//       pool.pool_address
//     )
    
//     const args = [
//         amountBN,
//         options.other
//       ]
  
//       return {
//         txInfo: {
//           abi, // abi array
//           interaction_address, // contract to interact with to interact with poolAddress
//           method_name, // method to interact with the pool
//           args, // args to pass to the smart contracts to trigger 'method_name'
//           amountPositions: [0]
//         },
//         assetInfo: null
//       }
// }

// async function claim_rewards (
//   pool: Pool,
//   amount: AmountInput,
//   addresses: AddressesInput,
//   options?: AdditionalOptions
// ): Promise<InteractionsReturnObject> {
//   const abi = STAKINGABI
//   const interaction_address = pool.staking_address
//   const method_name = 'claim_rewards'

//   const args = [
//       addresses.userAddress,
//       addresses.receiverAddress
//     ]

//     return {
//       txInfo: {
//         abi, // abi array
//         interaction_address, // contract to interact with to interact with poolAddress
//         method_name, // method to interact with the pool
//         args, // args to pass to the smart contracts to trigger 'method_name'
//         amountPositions: null
//       },
//       assetInfo: null
//     }
// }



const interactions: Interactions = {
  deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  stake: null,
  unstake: null,
  unstake_and_redeem: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null
}

export default interactions
