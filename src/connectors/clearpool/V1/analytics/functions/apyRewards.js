/* eslint-disable @typescript-eslint/no-var-requires */
const { getChainId } = require('../../../../../utils/getChainId');
const axios = require('axios');

async function checkClearpoolV1RewardsAPY(chain, poolAddress) {
  try {
    let LM = 0;
    const protocol_id = await getChainId(chain);
    const res = await axios.get('https://clearpool.finance/api/top-pools');
    const data = res.data[protocol_id];
    if (!(data.length > 0)) {
      throw new Error(`Data from Clearpool indexer not ok for ${poolAddress}`);
    }
    for (const elem of data) {
      if (elem.address.toLowerCase() === String(poolAddress).toLowerCase()) {
        LM = elem.cpoolAPR;
      }
    }
    return { data: LM, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkClearpoolV1RewardsAPY;
