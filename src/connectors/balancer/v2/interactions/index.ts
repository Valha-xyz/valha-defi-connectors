/* eslint-disable @typescript-eslint/no-var-requires */

import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';
import { CHAINS_ID } from '../../../../utils/CONST/CHAINS_ID';
import { RPC_PROVIDERS } from '../../../../utils/CONST/RPC_PROVIDERS';

/* eslint-disable @typescript-eslint/no-unused-vars */
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const { ROUTERABI } = require('../abi/ROUTERABI');
const { GAUGEABI } = require('../abi/GAUGEABI');
const { POOLABI } = require('../abi/POOLABI');

const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { ethers } = require('ethers');
import { BalancerSDK } from '@balancer-labs/sdk';
import { erc20Decimals } from '../../../../utils/ERC20Decimals';
import { BigNumber } from 'ethers';

async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;

  const config = {
    network: CHAINS_ID[pool.chain],
    rpcUrl: RPC_PROVIDERS[pool.chain],
  };

  const amountDesiredBN = [];
  for (const i in amount.amountsDesired) {
    const amBN = await toBnERC20Decimals(
      amount.amountsDesired[i],
      pool.chain,
      pool.underlying_tokens[i],
    );
    amountDesiredBN.push(amBN);
  }

  const balancer = new BalancerSDK(config);
  const poolinfo = await balancer.pools.find(pool.metadata.pool_id);
  const { attributes } = poolinfo.buildJoin(
    addresses.userAddress,
    pool.underlying_tokens,
    amountDesiredBN,
    '1',
  );

  const interaction_address = pool.investing_address;
  const method_name = 'joinPool';

  const args = [
    pool.metadata.pool_id,
    addresses.userAddress,
    addresses.receiverAddress,
    attributes.joinPoolRequest,
  ];

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args: args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [4],
    },
    assetInfo: {
      position_token: attributes.joinPoolRequest.assets, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: attributes.joinPoolRequest.maxAmountsIn.map((elem) =>
        String(elem),
      ),
    },
  };
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  //set up SDK
  const config = {
    network: CHAINS_ID[pool.chain],
    rpcUrl: RPC_PROVIDERS[pool.chain],
  };

  const balancer = new BalancerSDK(config);
  const provider = getNodeProvider(pool.chain);
  const decimals = await erc20Decimals(provider, pool.pool_address);
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address,
  );
  const bptAmount = ethers.utils
    .parseUnits(String(amount.amount), decimals)
    .toString();

  console.log('inAmount');
  console.log(bptAmount);

  const poolinfo = await balancer.pools.find(pool.metadata.pool_id);
  const { attributes, expectedAmountsOut, minAmountsOut } =
    poolinfo.buildExitExactBPTIn(addresses.userAddress, bptAmount, '1');

  const interaction_address = pool.investing_address;
  const method_name = 'exitPool';

  const poolAddress = new ethers.Contract(pool.pool_address, POOLABI, provider);
  const poolId = await poolAddress.getPoolId();

  const abi = ROUTERABI;
  const args = [
    poolId,
    addresses.userAddress,
    addresses.receiverAddress,
    attributes.exitPoolRequest,
  ];

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [4],
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

/// stake
async function stake(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = GAUGEABI;
  const method_name = 'deposit(uint256,address)';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
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
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = GAUGEABI;
  const method_name = 'withdraw(uint256,bool)';
  const position_token = pool.staking_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  const args = [amountBN, true];

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
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = GAUGEABI;
  const method_name = 'claim_rewards(address,address)';
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
  claim_interests: null,
};

export default interactions;
