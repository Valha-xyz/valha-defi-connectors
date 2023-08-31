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
const { GAUGEABI } = require('../abi/GAUGEABI')
const { POOLABI } = require('../abi/POOLABI')

const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { ethers } = require('ethers');

async function deposit (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI
  let args
  

  const interaction_address = pool.investing_address
  const method_name = 'joinPool'

  const provider = getNodeProvider(pool.chain);
  const poolAddress = new ethers.Contract(pool.pool_address, POOLABI, provider);
  const poolId = await poolAddress.getPoolId();

  let amountCDesired
  let amountDDesired

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

  if (pool.underlying_tokens.length === 2 ){
      args = [
      poolId,
      addresses.userAddress,
      addresses.receiverAddress,
      [pool.underlying_tokens, [amountADesired,amountBDesired],options.other,false]
    ]
  }
  if (pool.underlying_tokens.length === 3 ){

    const amountCDesired = await toBnERC20Decimals(
      amount.amountsDesired[2],
      pool.chain,
      pool.underlying_tokens[2]
    )

    args = [
    poolId,
    addresses.userAddress,
    addresses.receiverAddress,
    [pool.underlying_tokens, [amountADesired,amountBDesired, amountCDesired],options.other,false]
  ]
}
if (pool.underlying_tokens.length === 3 ){

  amountCDesired = await toBnERC20Decimals(
    amount.amountsDesired[2],
    pool.chain,
    pool.underlying_tokens[2]
  )

  amountDDesired = await toBnERC20Decimals(
    amount.amountsDesired[3],
    pool.chain,
    pool.underlying_tokens[3]
  )
  args = [
  poolId,
  addresses.userAddress,
  addresses.receiverAddress,
  [pool.underlying_tokens, [amountADesired,amountBDesired, amountCDesired, amountDDesired],options.other,false]
]
}
    

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [3]
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountADesired, amountBDesired, amountCDesired, amountDDesired]
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
  let args;

  const interaction_address = pool.investing_address
  const method_name = 'exitPool'

  const provider = getNodeProvider(pool.chain);
  const poolAddress = new ethers.Contract(pool.pool_address, POOLABI, provider);
  const poolId = await poolAddress.getPoolId();

  let amountCDesired
  let amountDDesired

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

  if (pool.underlying_tokens.length === 2 ){
      args = [
      poolId,
      addresses.userAddress,
      addresses.receiverAddress,
      [pool.underlying_tokens, [amountADesired,amountBDesired],options.other,false]
    ]
  }
  if (pool.underlying_tokens.length === 3 ){

    const amountCDesired = await toBnERC20Decimals(
      amount.amountsDesired[2],
      pool.chain,
      pool.underlying_tokens[2]
    )

    args = [
    poolId,
    addresses.userAddress,
    addresses.receiverAddress,
    [pool.underlying_tokens, [amountADesired,amountBDesired, amountCDesired],options.other,false]
  ]
}
if (pool.underlying_tokens.length === 3 ){

  amountCDesired = await toBnERC20Decimals(
    amount.amountsDesired[2],
    pool.chain,
    pool.underlying_tokens[2]
  )

  amountDDesired = await toBnERC20Decimals(
    amount.amountsDesired[3],
    pool.chain,
    pool.underlying_tokens[3]
  )
  args = [
  poolId,
  addresses.userAddress,
  addresses.receiverAddress,
  [pool.underlying_tokens, [amountADesired,amountBDesired, amountCDesired, amountDDesired],options.other,false]
]
}
    

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [3]
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountADesired, amountBDesired, amountCDesired, amountDDesired]
    }
  }
}


/// stake
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = GAUGEABI;
  const method_name = 'deposit(uint256,address)';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const args = [amountBN, addresses.userAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

/// unstake
async function unstake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = GAUGEABI;
  const method_name = 'withdraw(uint256,address)';
  const position_token = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const args = [amountBN, addresses.userAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0],
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

/// claim
async function claim_rewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = GAUGEABI;
  const method_name = 'claim_rewards(address, address)';
  const args = [addresses.userAddress, addresses.receiverAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.staking_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}



const interactions: Interactions = {
  deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem,
  stake,
  unstake,
  unstake_and_redeem: null,
  boost: null,
  unboost: null,
  claim_rewards,
  claim_interests: null
}

export default interactions
