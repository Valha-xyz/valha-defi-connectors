/* eslint-disable @typescript-eslint/no-var-requires */

import { getCurrentBlockTimestamp } from '../../../../utils/getCurrentBlockTimestamp';
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';

/* eslint-disable @typescript-eslint/no-unused-vars */
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const { ROUTERABI } = require('../abi/ROUTERABI');

async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions,
): Promise<InteractionsReturnObject> {
  const abi = ROUTERABI;
  console.log(amount);
  console.log(pool);
  const tokenA = pool.underlying_tokens[0];
  const tokenB = pool.underlying_tokens[1];
  const tokens = pool.underlying_tokens.map((elem) => elem.toLowerCase());
  const interaction_address = pool.investing_address;
  let method_name = '';
  let args = [];
  const amountADesired = await toBnERC20Decimals(
    amount.amountsDesired[0],
    pool.chain,
    pool.underlying_tokens[0],
  );
  const amountBDesired = await toBnERC20Decimals(
    amount.amountsDesired[1],
    pool.chain,
    pool.underlying_tokens[1],
  );

  const dataBlockTimestamp = await getCurrentBlockTimestamp();
  const timestamp = dataBlockTimestamp.data + 300000;

  if (tokens.includes('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) {
    method_name = 'addLiquidityETH';
    let amountDesired;
    let nativePosition;
    let tokenPosition;
    if (tokens[0] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 0;
      tokenPosition = 1;
      amountDesired = amountADesired;
    }
    if (tokens[1] === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      nativePosition = 1;
      tokenPosition = 0;
      amountDesired = amountBDesired;
    }
    const amountMin = await toBnERC20Decimals(
      amount.amountsMinimum[tokenPosition],
      pool.chain,
      pool.underlying_tokens[tokenPosition],
    );
    const amountNativeMin = await toBnERC20Decimals(
      amount.amountsMinimum[nativePosition],
      pool.chain,
      pool.underlying_tokens[nativePosition],
    );
    args = [
      pool.underlying_tokens[tokenPosition],
      amountDesired,
      amountMin,
      amountNativeMin,
      addresses.receiverAddress,
      options.deadline > 0 ? options.deadline : timestamp,
    ];
  } else {
    method_name = 'addLiquidity';
    const amountAMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[0],
      pool.chain,
      pool.underlying_tokens[0],
    );
    const amountBMinimum = await toBnERC20Decimals(
      amount.amountsMinimum[1],
      pool.chain,
      pool.underlying_tokens[1],
    );
    args = [
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMinimum,
      amountBMinimum,
      addresses.receiverAddress,
      options.deadline > 0 ? options.deadline : timestamp,
    ];
  }

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [2, 3],
    },
    assetInfo: {
      position_token: pool.underlying_tokens, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: [amountADesired, amountBDesired],
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
  const abi = ROUTERABI;
  const method_name = 'removeLiquidity';
  const tokenA = pool.underlying_tokens[0];
  const tokenB = pool.underlying_tokens[1];
  const interaction_address = pool.investing_address;
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    pool.pool_address,
  );
  const amountAMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[0],
    pool.chain,
    pool.underlying_tokens[0],
  );
  const amountBMinimum = await toBnERC20Decimals(
    amount.amountsMinimum[1],
    pool.chain,
    pool.underlying_tokens[1],
  );

  const dataBlockTimestamp = await getCurrentBlockTimestamp();
  const timestamp = dataBlockTimestamp.data + 300000;

  const args = [
    tokenA,
    tokenB,
    amountBN,
    amountAMinimum,
    amountBMinimum,
    addresses.receiverAddress,
    options.deadline > 0 ? options.deadline : timestamp,
  ];

  return {
    txInfo: {
      abi, // abi array
      interaction_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
      amountPositions: [2],
    },
    assetInfo: {
      position_token: pool.pool_address, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: amountBN,
    },
  };
}

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
  claim_interests: null,
};

export default interactions;
