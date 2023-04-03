/* eslint-disable @typescript-eslint/no-var-requires */
import { getNodeProvider } from '../../../../../utils/getNodeProvider'
import { ethers, BigNumber} from 'ethers'
import { PoolABI } from '../../abi/Pool'
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'
import { erc20Decimals } from '../../../../../utils/ERC20Decimals';


async function getSentimentData (chain, poolAddress) {
  try {
    const provider = getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const Pool = new ethers.Contract(poolAddress, PoolABI, provider)
    const underlyingTokenAddress = await Pool.asset()
    const { data, err } = await getGeckoTokenPrice(
      chain,
      underlyingTokenAddress
    )
    if (err) throw new Error(err.message)

    const underlyingDecimals = await erc20Decimals(provider, underlyingTokenAddress);
  if (underlyingDecimals === 0)
    throw new Error('Error: Sentiment underlying decimals null.');

    const tokenPrice = data
    const totalAssetsBN = await Pool.totalAssets()
    const totalSupplyBN = await Pool.totalSupply()
    const totalBorrowsBN = await Pool.borrows()
    const decimals = await Pool.decimals()

    const totalAssets = totalAssetsBN / 10 ** underlyingDecimals
    const totalSupply = totalSupplyBN / 10 ** decimals
    const totalBorrows = totalBorrowsBN / 10 ** underlyingDecimals

    const outloans = totalBorrows * tokenPrice
    const TVL = totalAssets * tokenPrice
    const liquidity = TVL - outloans
    const sharePrice = totalAssets / totalSupply
    

    return {
        data: {
          TVL,
          sharePrice,
          liquidity,
          outloans
        },
        err: null
      }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

export default getSentimentData