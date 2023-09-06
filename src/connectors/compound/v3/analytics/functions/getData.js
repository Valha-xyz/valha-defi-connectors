/* eslint-disable @typescript-eslint/no-var-requires */

import { gql, request } from 'graphql-request'
const _ = require('lodash');


const SUBGRAPH_URLS = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-ethereum',
  base: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-base',
  arbitrum: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-arbitrum',
  polygon: 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-polygon',
}


function poolsQuery(pool){

  let poolCondition = `(where: { id: "${pool}" })`
  return gql`
  {
  markets${poolCondition}{
    id
    name
    exchangeRate
    rates {
      id
      rate
    }
    totalValueLockedUSD
    totalDepositBalanceUSD
    totalBorrowBalanceUSD
    rewardTokenEmissionsUSD
  }
}
`
}




async function checkCompoundV3Data(chain, poolAddress, underlyingToken) {

  try {

    const pool = poolAddress + underlyingToken.substring(2) ;
    const SUBGRAPH_URL = SUBGRAPH_URLS[chain];
    const filteredPool = await request(SUBGRAPH_URL, poolsQuery(pool));

    console.log(filteredPool);

    const singlePool = filteredPool.markets[0];

    const TVL = Number(singlePool.totalValueLockedUSD)

    const apyRew = Number(singlePool.rewardTokenEmissionsUSD[0])*365 / TVL;


    return { data: { apyAct: Number(singlePool.rates[1].rate), apyRew: 100*apyRew, TVL: TVL,
       sharePrice: Number(singlePool.exchangeRate) , borrow:Number(singlePool.totalBorrowBalanceUSD)}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCompoundV3Data;
