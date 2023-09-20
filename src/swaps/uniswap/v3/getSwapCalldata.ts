import { BigNumber, ethers, type BigNumberish } from 'ethers';
import {
  SwapOptions,
  type GetSwapCalldataFunction,
} from '../../../utils/types/liquidityProviders';
import { QUOTER_CONTRACT_ADDRESS } from './getQuotePrice';
import { getNodeProvider } from '../../../utils/getNodeProvider';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import Router from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json';
import { FEE_AMOUNTS } from './const';
import { ROUTER_CONTRACT } from './getSwapRouterAddress';

// This function aims at providing the arguments necessary to do a swap on uniswap v3 (the fee level), and not the calldata per se
export const getSwapCalldata: GetSwapCalldataFunction = async (
  chain: string,
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  swapperAddress: string,
  options: SwapOptions,
) => {
  const provider = getNodeProvider(chain);
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    provider,
  );

  // We need to find the fee amount that suits the swap best
  const quoteAmounts: BigNumber[] = await Promise.all(
    FEE_AMOUNTS.map(async (fee) => {
      const quote = await quoterContract.callStatic
        .quoteExactInputSingle(tokenIn, tokenOut, fee, amount, 0)
        .catch(() => BigNumber.from(0));
      return quote;
    }),
  );

  // We take the index of the maximum value of quoteAmounts
  const bestIndex = quoteAmounts.reduce(
    (indexMax, c, index) => (quoteAmounts[indexMax].gt(c) ? indexMax : index),
    0,
  );

  return {
    data: FEE_AMOUNTS[bestIndex].toString(),
  };
};

// This function aims at providing not the calldata but the arguments necessary to do a swap on uniswap v3
export const getUniswapCalldata = async (
  chain: string,
  tokenIn: string,
  amount: BigNumberish,
  tokenOut: string,
  minOutAmount: BigNumberish,
  fee: string | number,
  fee_recipient: string,
  swapperAddress: string,
) => {
  const provider = getNodeProvider(chain);
  const quoterContract = new ethers.Contract(
    ROUTER_CONTRACT[chain],
    Router.abi,
    provider,
  );

  // We need to find the fee amount that suits the swap best
  console.log('IN UNISWAP');
  console.log(swapperAddress);
  console.log('fee: ' + fee_recipient);
  console.log(
    chain,
    tokenIn,
    amount,
    tokenOut,
    minOutAmount,
    fee,
    fee_recipient,
    swapperAddress,
  );
  const tx = await quoterContract.populateTransaction.exactInputSingle({
    tokenIn,
    tokenOut,
    fee,
    recipient: fee_recipient,
    deadline: 1000000000000000,
    amountIn: amount,
    amountOutMinimum: minOutAmount,
    sqrtPriceLimitX96: 0,
  });
  return tx.data;
};
