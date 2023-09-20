/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
const { LP } = require('../../abi/LP');
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const pools = require('../../pools/pools');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
const axios = require('axios');
const _ = require('lodash');

const BASE_URL = 'https://across.to/api/pools?token=<IDHOLDER>';

async function checkAcrossV0TVL(chain, poolAddress) {
  try {
    //Settle provider to call onchain data
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');

    // import tokens
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    console.log(poolInfo);

    const mainPool = new ethers.Contract(poolAddress, LP, provider);
    const poolTotalSupply = await mainPool.totalSupply();

    // Underlying price

    const info2 = await getGeckoTokenPrice(
      chain,
      poolInfo.underlying_tokens[0],
    );
    if (info2.err) throw new Error(info2.err.message);
    const underlyingTokenPrice = info2.data;

    // Decimals and Supply
    const poolTokenDecimals = await erc20Decimals(provider, poolAddress);
    const underlying_decimals = await erc20Decimals(
      provider,
      poolInfo.underlying_tokens[0],
    );

    // Exchange rate

    const URL = BASE_URL.replace('<IDHOLDER>', poolInfo.underlying_tokens[0]);
    const result = await axios.get(URL);

    const exchangeRateCurrent =
      Number(result.data.exchangeRateCurrent) / 10 ** 18;

    // TVl

    const tvlUsd =
      (underlyingTokenPrice * poolTotalSupply * exchangeRateCurrent) /
      10 ** underlying_decimals;

    return { data: tvlUsd, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkAcrossV0TVL;
