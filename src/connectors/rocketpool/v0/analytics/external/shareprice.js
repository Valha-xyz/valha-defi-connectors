/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider')
const ethers = require('ethers')
const RPLABI = require('../../abi/ERC20RPL.json')

async function checkRocketV0SharePrice (chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain)
    if (!provider) throw new Error('No provider was found.')
    const RPL = new ethers.Contract(poolAddress, RPLABI, provider)
    const exchangeRateBN = await RPL.getExchangeRate()
    const sharePrice = exchangeRateBN.toString() / 10 ** 18
    return { data: sharePrice, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = checkRocketV0SharePrice
