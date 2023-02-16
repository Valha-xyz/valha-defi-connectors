/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const getData = require('src/connectors/curve/v2/analytics/functions/getData');
const pools = require('../../../../curve/v2/pools/pools');
const _ = require('lodash');

async function getCurvePoolTVL(chain, poolAddress) {
  try {
    //Find TVL thanks to LP Token
    const info = await getData(chain, poolAddress);
    if (info.err)
      throw new Error(`Data from Convex V0 indexer not ok for ${poolAddress}`);
    const curveTVL = info.usdTotal;
    return { data: curveTVL, err };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getCurvePoolTVL;
