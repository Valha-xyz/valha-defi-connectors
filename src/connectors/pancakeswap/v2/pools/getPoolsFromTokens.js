const FACTORYABI = require('../abi/FACTORY.json')
const ethers = require('ethers')

/// pools
const FACTORY = {
  bsc: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
  ethereum: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362'
}

async function getPoolsFromTokens (chain, tokens, fee) {
  try {
    const tokenA = tokens[0]
    const tokenB = tokens[1]
    const address = FACTORY[chain]
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const POOL = new ethers.Contract(address, FACTORYABI, provider)
    const poolAddress = await POOL.getPair(tokenA, tokenB)
    return { data: poolAddress, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = getPoolsFromTokens
