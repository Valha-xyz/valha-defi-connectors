// The goal of this function is to get the expected amount of tokens you would get from redeeming an amount of pool tokens
import { BigNumber, type BigNumberish, Contract } from 'ethers'
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { type Pool } from '../../../../../utils/types/connector-types'
import { POOLABI } from '../../abi/POOLABI'

// This needs to return the minimum amount expected for each token.
// For curve, we simply choose the first token (not the best this time...)
export const getMinimumRedeem = async (
  amount: BigNumberish,
  pool: Pool
): Promise<BigNumber[]> => {
  const provider = getNodeProvider(pool.chain)
  const poolContract = new Contract(pool.pool_address, POOLABI, provider)

  // We reimplement the `burn` function computation in : https://etherscan.io/address/0x3041cbd36888becc7bbcbc0045e3b1f144466f5f#code
  const [[reserve0, reserve1], totalSupply] = await Promise.all([
    poolContract.getReserves(),
    poolContract.totalSupply()
  ])

  const amount0 = BigNumber.from(amount).mul(reserve0).div(totalSupply)
  const amount1 = BigNumber.from(amount).mul(reserve1).div(totalSupply)

  return [amount0, amount1]
}
