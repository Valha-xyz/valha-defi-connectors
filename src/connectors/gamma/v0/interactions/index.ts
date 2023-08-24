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
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals')
const { POOLABI } = require('../abi/POOL')
const { GAUGEABI } = require('../abi/GAUGE')
const { ROUTERABI } = require('../abi/ROUTER')
const PID = require('./PID');


/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  const method_name = 'deposit(uin256,uint256,address,address,uint256[4])';
  const amountADesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0]
  );
  const amountBDesired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1]
  );
  const amountAMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.underlying_tokens[0]
  );
  const amountBMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[1],
    pool.chain,
    pool.underlying_tokens[1]
  );

  let inMin = [0,0,0,0]
  
  if  (pool.metadata.directdeposit == true ) {
    inMin = [amountAMinimum, amountBMinimum, 0,0];
  } else {
    inMin = [0,0, amountAMinimum, amountBMinimum];
  };

  const args = [
    amountADesired,
    amountBDesired,
    addresses.receiverAddress,
    pool.pool_address,
    inMin
  ];
  const interaction_address = pool.investing_address;
  

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0,1]
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountADesired, amountBDesired],
    },
  };
}

/// redeem
async function redeem (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const method_name = 'withdraw(uint256,address,address,uint256[4])';
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address
  );
  const amountAMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.underlying_tokens[0]
  );
  const amountBMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[1],
    pool.chain,
    pool.underlying_tokens[1]
  );

  let inMin = [0,0,0,0]
  
  if  (pool.metadata.directdeposit == true ) {
    inMin = [amountAMinimum, amountBMinimum, 0,0];
  } else {
    inMin = [0,0, amountAMinimum, amountBMinimum];
  }; 
  const args = [
    amountBN,
    addresses.receiverAddress,
    addresses.userAddress,
    inMin
  ];
  const interaction_address = pool.pool_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [0]
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}


/// stake
async function stake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const pid = PID[pool.chain][pool.pool_address.toLowerCase()]
  const interaction_address = pool.staking_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address
  )
  const abi = GAUGEABI
  const method_name = 'deposit(uint256, address)'
  const args = [pid,amountBN, addresses.receiverAddress]

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

/// unstake
async function unstake (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const pid = PID[pool.chain][pool.pool_address.toLowerCase()]
  const interaction_address = pool.staking_address
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address
  )
  const abi = GAUGEABI
  const method_name = 'withdrawAndHarvest(uint256, uint256,address)'
  const args = [pid,amountBN,addresses.receiverAddress]

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [1]
    },
    assetInfo: null
  }
}

/// claimRewards
async function claimRewards (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const pid = PID[pool.chain][pool.pool_address.toLowerCase()]
  const interaction_address = pool.staking_address
  const amountBN = '0'
  const abi = GAUGEABI
  // Indeed 'deposit' to claim_rewards on Gamma (because masterchef contract from sushi has thismechanism)
  const method_name = 'deposit(uint256,uint256,to)'
  const args = [pid,amountBN,addresses.receiverAddress]

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN
    }
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
