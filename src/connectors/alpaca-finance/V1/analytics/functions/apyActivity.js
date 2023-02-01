import axios from 'axios'

async function checkAlpacaV1APY (chain, poolAddress) {
  try {
    let LM = 0
    const { data } = await axios.get(
      'https://alpaca-static-api.alpacafinance.org/bsc/v1/landing/summary.json'
    )
    if (data.data.lendingPools.length === 0) { throw new Error(`Data from Alpaca indexer not ok for ${poolAddress}`) }
    for (const elem of data.data.lendingPools) {
      if (
        elem.ibToken.address.toLowerCase() === String(poolAddress).toLowerCase()
      ) {
        LM = elem.lendingApr
      }
    }
    return { data: LM, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}

module.exports = checkAlpacaV1APY
