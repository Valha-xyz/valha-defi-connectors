/* eslint-disable @typescript-eslint/no-var-requires */
import { PoolABI } from '../../abi/Pool';
import { ethers } from 'ethers';
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkCompoundV2Liquidity(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const decimals = await erc20Decimals(provider, poolAddress);
    const CashBN = await POOL.getCash();
    const Cash = CashBN / 10 ** decimals;
    const ReservesBN = await POOL.totalReserves();
    const Reserves = ReservesBN / 10 ** decimals;
    const Liquidity = Cash - Reserves;
    return { data: Liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCompoundV2Liquidity;
