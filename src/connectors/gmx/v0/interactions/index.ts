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
import { GLPABI } from '../abi/GLP';
import checkGMXV0Share from '../analytics/functions/sharePrice';
const ethers = require('ethers');
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

const GLP_MANAGER = '0x3963FfC9dff443c2A94f21b129D429891E32ec18';

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = RouterABI;
  const method_name = 'mintAndStakeGlp';
  const position_token = pool.underlying_tokens[0];
  const ShareInfo = await checkGMXV0Share(pool.chain, pool.pool_address);
  if (ShareInfo.err) throw new Error(ShareInfo.err);
  const SharePrice = ShareInfo.data;
  if (SharePrice === 0 || !SharePrice) {
    throw new Error(
      'Error: wrong share price to get the minimum amount of GLP to mint.',
    );
  }
  const minAmountGLP = (1 / SharePrice) * parseFloat(amount.amount) * 0.997;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );
  const minAmountBN = await toBnERC20Decimals(
    String(minAmountGLP),
    pool.chain,
    position_token,
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
      approval_address: GLP_MANAGER,
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
  const abi = RouterABI;
  const method_name = 'unstakeAndRedeemGlp';
  const position_token = pool.pool_address;
  const underlying = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token,
  );

  const ShareInfo = await checkGMXV0Share(pool.chain, pool.pool_address);
  if (ShareInfo.err) throw new Error(ShareInfo.err);
  const SharePrice = ShareInfo.data;
  if (SharePrice === 0 || !SharePrice) {
    throw new Error(
      'Error: wrong share price to get the minimum amount of GLP to mint.',
    );
  }
  const minAmountOut = SharePrice * parseFloat(amount.amount) * 0.995;
  const tokenToReceive = pool.underlying_tokens[0];
  const minAmountOutBN = await toBnERC20Decimals(
    minAmountOut,
    pool.chain,
    tokenToReceive,
  );

  const args = [
    underlying,
    amountBN,
    minAmountOutBN,
    addresses.receiverAddress,
  ];

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
      approval_address: GLP_MANAGER,
    },
  };
}

/// claim
async function claimRewards(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = GLPABI;
  const interaction_address = pool.pool_address;
  const method_name = 'claim';
  const args = [addresses.receiverAddress];

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
