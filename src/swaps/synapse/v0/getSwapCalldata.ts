import { BigNumber, ethers, type BigNumberish } from 'ethers';
import { getNodeProvider } from '../../../utils/getNodeProvider';
import axios from 'axios';
import { SYNAPSE_API } from './apiconst';
import { erc20Symbol } from '../../../utils/ERC20Symbol';
import { CHAINS_ID } from '../../../utils/CONST/CHAINS_ID';
import { erc20Decimals } from '../../../utils/ERC20Decimals';

// This function aims at providing not the calldata but the arguments necessary to do a swap on uniswap v3
export const getSwapCalldata: any = async (
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
  const symbolFrom = await erc20Symbol(provider, tokenIn);
  const symbolTo = await erc20Symbol(provider, tokenOut);
  const decimals = await erc20Decimals(provider, tokenIn);
  const amountNotBN = BigNumber.from(amount)
    .div(10 ** decimals)
    .toString();

  console.log(symbolFrom);
  console.log(symbolTo);
  console.log(CHAINS_ID[chain]);
  console.log(amountNotBN);

  const { data } = await axios.get(
    `${SYNAPSE_API}/swapTxInfo?chain=${CHAINS_ID[chain]}&fromToken=${symbolFrom}&toToken=${symbolTo}&amount=${amountNotBN}`,
  );
  console.log(data);

  return data.data;
};
