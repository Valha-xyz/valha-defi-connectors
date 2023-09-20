/* eslint-disable @typescript-eslint/no-var-requires */
import { PoolABI } from '../../abi/Pool';
import { ethers } from 'ethers';
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');

async function checkVenusLendingLiquidity(
  chain,
  poolAddress,
  underlyingDecimals
) {
  try {
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const CashBN = await POOL.getCash();
    const Cash = CashBN / 10 ** underlyingDecimals;
    const ReservesBN = await POOL.totalReserves();
    const Reserves = ReservesBN / 10 ** underlyingDecimals;
    const Liquidity = Cash - Reserves;
    return { data: Liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkVenusLendingLiquidity;
