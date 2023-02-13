const axios = require('axios');

const URL = {
  optimism: 'https://api.ib.xyz/api/v1/itoken?comptroller=optimism',
};

async function checkIBData(chain, poolAddress) {
  try {
    const url = URL[chain];
    const { data } = await axios.get(url);
    if (!data) {
      throw new Error(`Data from Ibank indexer not ok for ${poolAddress}`);
    }
    for (const elem of data) {
      console.log(elem);
      if (elem.token_address.toLowerCase() === poolAddress.toLowerCase()) {
        return elem;
      }
    }
    throw new Error(`Data from Ibank indexer not ok for ${poolAddress}`);
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkIBData;
