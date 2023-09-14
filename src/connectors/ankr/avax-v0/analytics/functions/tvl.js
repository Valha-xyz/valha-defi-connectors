/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { ANKRABI } = require('src/connectors/ankr/avax-v0/abi/ERC20ANKR');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice'

async function checkAnkrTVL(chain, poolAddress) {
  try {

    const tokenAddress = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'

    const avaxInfo = await getGeckoTokenPrice(chain, tokenAddress );

    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, ANKRABI, provider);

    const SupplyBN = await POOL.totalSupply();
    // const DecimalsBN = await POOL.decimals();
    const ratio = await POOL.ratio();
    const price = avaxInfo.data ;

    const tvlUsd = ( SupplyBN * price ) / ratio;



    // const allchains = {
    //   bsc: 'bnb',
    //   eth: 'eth',
    //   polygon: 'polygon',
    //   fantom: 'ftm',
    //   avalanche: 'avax'
    // }

    // const result = await axios.get(
    //   'https://api.staking.ankr.com/v1alpha/metrics',
    // );
    // // console.log(result.data.services.length);
    // if (!result.data.services.length) {
    //   throw new Error(
    //     `Ankr V0: issue while checking info for ${poolAddress}`,
    //   );
    // }

    // const poolsInfo = result.data.services.filter(
    //   elem => elem.serviceName === allchains[chain],
    // );
    // if (poolsInfo.length !== 1) {
    //   throw new Error(
    //     `Ankr V0: issue while filtering info for ${poolAddress}`,
    //   );
    // }

    // const tvl = Number(poolsInfo[0].totalStakedUsd);

    return { data: tvlUsd, err: null };
  }
  catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAnkrTVL;
