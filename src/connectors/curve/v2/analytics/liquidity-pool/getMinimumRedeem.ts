// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { type BigNumber, type BigNumberish, Contract, ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type Pool } from '../../../../../utils/types/connector-types'
import {RouterABI2} from './../../abi/router2'
import {RouterABI3} from './../../abi/router3'
import ERC20ABI from "../../../../../utils/abi/ERC20.json";
const pMap = require('p-map')

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain)
  const size = pool.underlying_tokens.length;
  let abi;
  if (size === 2) {
    abi = RouterABI2;
  } else if (size === 3) {
    abi = RouterABI3;
  } else {
    throw new Error('Error: pool size is not handle.');
  }


  const investingContract = new Contract(
    pool.investing_address,
    abi,
    provider
  )

  // This two cases is there to be able to deal with curve pools with and without one coin withdrawal
  const allAmounts = await pMap(pool.underlying_tokens, async (v, i) =>{
    const poolContract = new ethers.Contract(pool.pool_address, ERC20ABI, provider);
    const totalSupply = await poolContract.totalSupply();
    const balance = await investingContract.balances(i, { gasLimit: 100000 });
    return balance.mul(amount1).div(totalSupply)
  });

  return allAmounts
}