// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { type BigNumber, type BigNumberish, Contract } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type Pool } from '../../../../../utils/types/connector-types'
const { POOLABI } = require('../../abi/POOL');

// This needs to return the minimum amount expected for each token.
export async function GetQuotePriceFunction(
  amount1: BigNumber,
  amount2: BigNumber,
  chain: string,
  pool: Pool,
): Promise<BigNumber> {
  const provider = getNodeProvider(chain)
  const poolContract = new Contract(
    pool.investing_address,
    POOLABI,
    provider
  )
  const allAmounts = poolContract.previewShares(amount1,amount2);


  return allAmounts.shares
}
