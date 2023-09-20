// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { type BigNumber, type BigNumberish, Contract, ethers } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type Pool } from '../../../../../utils/types/connector-types'
import {ROUTERABI} from '../../abi/Router'
import ERC20ABI from "../../../../../utils/abi/ERC20.json";
const pMap = require('p-map')

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount1: BigNumberish,
  pool: Pool
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain)
  const investingContract = new Contract(pool.investing_address,ROUTERABI,provider)

  const allAmounts = await investingContract.calculateRemoveLiquidity(amount1);
  
  return allAmounts
}