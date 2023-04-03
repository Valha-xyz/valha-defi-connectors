const axios = require('axios');
const _ = require('lodash');

const URL_ = {
  ethereum: 'https://api-mainnet.solidly.com/api/v1/pairs'
};

async function getData(chain, poolAddress) {
  try {
    const url = URL_[chain];
    const res  = await axios.get(url);
    
    
    if (!res.data.success)
      throw new Error(`Data from Solidly V2 indexer not ok for ${poolAddress}`);
    const info = res.data.data;
    
    
    const poolInfo = _.find(info, (elem) => {
    return elem.address.toLowerCase() === poolAddress.toLowerCase();
    });

    

    const totalSupply  = poolInfo.totalSupply
    const totalTvlUsd= poolInfo.totalTvlUsd
    const totalApy = poolInfo.totalLpApr.current
    return {
      data: {
        totalSupply,
        totalTvlUsd,
        totalApy
      },
      err: null
     }
  } catch (err) {
    console.log(err);
    return { data: null, err }
  }
}

export default getData