/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const { getUSDETH } = require('../../../../../utils/prices/getUSDETH');

async function getInstadappInfo(chain, poolAddress) {
  try {
    const { data } = await axios.get(
      'https://api.instadapp.io/v2/mainnet/lite/users/0xb29601eB52a052042FB6c68C69a442BD0AE90082/vaults'
    );
    if (!data) {
      throw new Error(`Data from instadapp indexer not ok for ${poolAddress}`);
    }
    let info = null;
    for (const elem of data) {
      if (elem.vault.toLowerCase() === poolAddress.toLowerCase()) {
        info = elem;
        break;
      }
    }
    if (!info)
      throw new Error(`Data from instadapp indexer not ok for ${poolAddress}`);
    const tvlETH = parseFloat(info['vaultTVLInAsset']);
    const liquidityETH = parseFloat(info['availableWithdraw']);
    const ETHPrice = await getUSDETH();
    if (ETHPrice.err) throw new Error(ETHPrice.err);
    const TVL = tvlETH * ETHPrice.data;
    const Liquidity = liquidityETH * ETHPrice.data;
    return {
      data: {
        activity_apy: info['apy']['apyWithoutFee'],
        tvl: TVL,
        liquidity: Liquidity,
      },
      err: null,
    };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getInstadappInfo;
