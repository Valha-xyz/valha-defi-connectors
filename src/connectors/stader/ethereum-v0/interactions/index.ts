/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const { POOLABI } = require('../abi/DepositPool');
const { WithdrawABI } = require('../abi/WithdrawPool');
const { getNodeProvider } = require('../../../../utils/getNodeProvider');
const { ethers } = require('ethers');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = POOLABI;
  const method_name = 'deposit(address)';
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  const args = [addresses.userAddress];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.underlying_tokens[0], // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

/// redeem (after unlocking and waiting for 2-3 days)
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = WithdrawABI;
  const method_name = 'claim';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );

  const chain = pool.chain;

  // retrieve idx, the argument used to call the function, we take the formest request made by an user
  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const Pool = new ethers.Contract(pool.pool_address, WithdrawABI, provider);
  const requests = await Pool.getRequestIdsByUser(addresses.userAddress);
  const idx = requests[0];

  const args = [idx];
  const interaction_address = pool.staking_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: pool.pool_address,
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

/// unlock (before redeeming)
async function unlock(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = WithdrawABI;
  const method_name = 'requestWithdraw(uint256, address)';
  const position_token = pool.pool_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  const args = [amountBN, addresses.userAddress];
  const interaction_address = pool.investing_address;

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

const interactions: Interactions = {
  deposit,
  deposit_all: null,
  deposit_and_stake: null,
  unlock,
  redeem,
  redeem_all: null,
  unstake_and_redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null,
};

export default interactions;
