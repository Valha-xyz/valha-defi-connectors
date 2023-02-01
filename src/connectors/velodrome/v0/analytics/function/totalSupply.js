/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider')
const ethers = require('ethers')
const ERC20ABI = require('../../../../../utils/abi/ERC20.json')

async function checkVelodromeV0Supply (chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const Token = new ethers.Contract(poolAddress, ERC20ABI, provider)
    const decimals = await Token.decimals()
    const supplyBN = await Token.totalSupply()
    const supply = supplyBN / 10 ** decimals
    return { data: supply, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = checkVelodromeV0Supply
