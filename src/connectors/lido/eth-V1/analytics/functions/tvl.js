/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('src/utils/getNodeProvider')
const ethers = require('ethers')
const PoolTokenABI = require('src/connectors/lido/abi/STETH.json')
const { erc20Decimals } = require('src/utils/ERC20Decimals')
const { getUSDETH } = require('src/dispatcher/analytics/prices/getUSDETH')

async function checkLidoV0TVL (poolAddress) {
  try {
    const provider = await getNodeProvider('ethereum')
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider)
    const TvlBN = await POOL.totalSupply()
    const decimals = await erc20Decimals(provider, poolAddress)
    const TVL = TvlBN / 10 ** decimals
    const { data, err } = await getUSDETH()
    if (err) throw new Error(err.message)
    const exchangePrice = data
    const TVLUSD = TVL * exchangePrice
    console.log(TVLUSD)
    return { data: TVLUSD, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = checkLidoV0TVL
