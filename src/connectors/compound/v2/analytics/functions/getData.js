/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

async function checkCompoundv2Data(chain, poolAddress) {
  try {
    const { data } = await axios.get(
      'https://api.compound.finance/api/v2/ctoken',
    );
    if (!data || !data.cToken) {
      throw new Error(`Data from Compound indexer not ok for ${poolAddress}`);
    }
    for (const elem of data.cToken) {
      if (elem.token_address.toLowerCase() === poolAddress.toLowerCase()) {
        return elem;
      }
    }
    throw new Error(`Data from Compound indexer not ok for ${poolAddress}`);
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCompoundv2Data;
