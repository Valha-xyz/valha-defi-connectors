/* eslint-disable @typescript-eslint/no-var-requires */
import {
  AdditionalOptions,
  AddressesInput,
  AmountInput,
  Interactions,
  InteractionsReturnObject,
  Pool,
} from '../../../../utils/types/connector-types';
import { RouterABI } from '../abi/Router';
import checkGMXV0Share from '../analytics/functions/sharePrice';
const ethers = require('ethers');
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = RouterABI;
  const method_name = 'mintAndStakeGlp';
  const position_token = pool.underlying_tokens[0];
  const ShareInfo = await checkGMXV0Share(pool.chain, pool.pool_address);
  if (ShareInfo.err) throw new Error(ShareInfo.err);
  const SharePrice = ShareInfo.data;
  if (SharePrice === 0) {
    throw new Error(
      'Error: wrong share price to get the minimum amount of GLP to mint.'
    );
  }
  const minAmountGLP = (1 / SharePrice) * parseFloat(amount.amount) * 0.997;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const minAmountBN = await toBnERC20Decimals(
    String(minAmountGLP),
    pool.chain,
    position_token
  );
  const args = [position_token, amountBN, '0', minAmountBN];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: position_token, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: amountBN,
    },
  };
}

/// redeem
async function redeem(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = RouterABI;
  const method_name = 'unstakeAndRedeemGlp';
  const position_token = pool.pool_address;
  const underlying = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const minAmountOut = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    position_token
  );
  const args = [underlying, amountBN, minAmountOut, addresses.receiverAddress];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token: position_token, // token needed to approve
      position_token_type: 'ERC-20', //token type to approve
      amount: amountBN,
    },
  };
}

/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = RouterABI;
  const interaction_address = pool.investing_address;
  const method_name = 'claim';
  const args = [];

  return {
    txInfo: {
      abi: abi, //abi array
      interaction_address: interaction_address, // contract to interact with to interact with poolAddress
      method_name: method_name, //method to interact with the pool
      args: args, //args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: null,
  };
}

const interactions: Interactions = {
  deposit: deposit,
  deposit_all: null,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  redeem_all: null,
  unstake_and_redeem: null,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};

export default interactions;
