const axios = require('axios');

const URL_ = {
  arbitrum: 'https://arbitrum.sentiment.xyz/api/markets/',
};

const address = {
  '0x0ddb1ea478f8ef0e22c7706d2903a41e94b1299b' : '0x0dDB1eA478F8eF0E22C7706D2903a41E94B1299B',
  '0x4c8e1656e042a206eef7e8fcff99bac667e4623e' : '0x4c8e1656E042A206EEf7e8fcff99BaC667E4623e',
  '0xb190214d5ebac7755899f2d96e519aa7a5776bec' : '0xb190214D5EbAc7755899F2D96E519aa7a5776bEC',
  '0x2e9963ae673a885b6bfeda2f80132ce28b784c40' : '0x2E9963ae673A885b6bfeDa2f80132CE28b784C40',
  '0x21202227bc15276e40d53889bc83e59c3cccc121' : '0x21202227Bc15276E40d53889Bc83E59c3CccC121',

  };

async function getAPY(chain, poolAddress) {
  try {
    const url = URL_[chain] + address[poolAddress];
    const { data } = await axios.get(url);
    if (!data) {
      throw new Error(`Data from Sentiment indexer not ok for ${poolAddress}`);
    }
    return {
        data: {
          supplyAPY: parseFloat(data['supplyAPY']),
        },
        err: null,
      };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

export default getAPY