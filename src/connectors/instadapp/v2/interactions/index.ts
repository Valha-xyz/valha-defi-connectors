/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {
  type AdditionalOptions,
  type AddressesInput,
  type AmountInput,
  type Interactions,
  type InteractionsReturnObject,
  type Pool,
} from '../../../../utils/types/connector-types';
import { BigNumber } from 'ethers';
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');
const { PoolWrapperABI } = require('../abi/PoolWrapper');
const getInstadappv2SharePrice = require('../analytics/external/shareprice');

/// invest
async function deposit(
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
): Promise<InteractionsReturnObject> {
  const abi = PoolWrapperABI;
  const method_name = 'deposit';
  const position_token = pool.underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const INSTADAPP_WRAPPER_API = `https://api.instadapp.io/defi/mainnet/1inch/v5/swap?buyToken=0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84&sellToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&sellAmount=${amountBN.toString()}&dsaAddress=0x0000000000000000000000000000000000000000`;
  const { data } = await axios.get(INSTADAPP_WRAPPER_API);
  const swapCalldata = data.calldata;
  const inTokenAmount = data.sellTokenAmount;
  const outTokenAmount = data.buyTokenAmount;
  const args = [swapCalldata, outTokenAmount, addresses.receiverAddress];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
      method_name, // method to interact with the pool
      args, // args to pass to the smart contracts to trigger 'method_name'
    },
    assetInfo: {
      position_token, // token needed to approve
      position_token_type: 'ERC-20', // token type to approve
      amount: inTokenAmount,
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
  const abi = PoolWrapperABI;
  const method_name = 'withdraw';
  const position_token = pool.pool_address;
  const sharePriceInfo = await getInstadappv2SharePrice(
    pool.chain,
    pool.pool_address
  );
  const INSTADAPP_WITHDRAW_FEE = 5 / 1000;
  const exchangePrice = sharePriceInfo.data;
  if (!exchangePrice) {
    throw new Error('Instadapp: error while getting the exchange price.');
  }
  const amountMinusFee =
    parseFloat(amount.amount) * (1 - INSTADAPP_WITHDRAW_FEE);
  const amountBN = await toBnERC20Decimals(
    amount.amount,
    pool.chain,
    position_token
  );
  const amountMinusFeeBN = await toBnERC20Decimals(
    String(amountMinusFee),
    pool.chain,
    '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
  );
  console.log('-------------');
  console.log(amountBN.toString());
  console.log('EXCHANGE');
  console.log(amountMinusFeeBN.toString());
  console.log('-------------');
  const INSTADAPP_WRAPPER_API = `https://api.instadapp.io/defi/mainnet/1inch/v5/swap?buyToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&sellToken=0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84&sellAmount=${amountMinusFeeBN.toString()}&dsaAddress=0x0000000000000000000000000000000000000000`;
  const { data } = await axios.get(INSTADAPP_WRAPPER_API);
  const swapCalldata = data.calldata;
  const outTokenAmount = data.buyTokenAmount;
  const minAmountInt = outTokenAmount * 0.9999;
  const minAmountIntBN = BigNumber.from(String(minAmountInt));
  console.log(minAmountIntBN.toString());
  console.log(addresses.receiverAddress);
  const args = [
    amountBN,
    swapCalldata,
    minAmountIntBN,
    addresses.receiverAddress,
  ];

  return {
    txInfo: {
      abi, // abi array
      interaction_address: pool.investing_address, // contract to interact with to interact with poolAddress
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
  unlock: null,
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
