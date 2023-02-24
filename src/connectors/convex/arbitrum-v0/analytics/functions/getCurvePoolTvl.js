/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const getData = require('../../../../curve/v2/analytics/functions/getData');
const pools = require('../../../../curve/v2/pools/pools');
const _ = require('lodash');

async function getCurvePoolTVL(chain, poolAddress, curveID) {
  try {
    //Find TVL thanks to LP Token
    const info = await getData(chain, poolAddress, curveID);
    if (info.err || !info.data)
      throw new Error(`Data from Convex V0 indexer not ok for ${poolAddress}`);
    console.log(info);
    const curveTVL = info.data.usdTotal;
    return { data: curveTVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err.message };
  }
}

module.exports = getCurvePoolTVL;
