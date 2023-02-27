/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
import { getGeckoTokenPrice } from '../../../../../utils/prices/getGeckoTokenPrice';
import { StakeABI } from '../../abi/Stake';
import checkPoolSupply from './totalSupply';
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

const CVX_ADDRESS = '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b';
const cliffSize = 100000; // * 1e18; //new cliff every 100,000 tokens
const cliffCount = 1000; // 1,000 cliffs
const maxSupply = 100000000; // * 1e18; //100 mil max supply

// All the logic inspired by DefiLlama work here:https://github.com/DefiLlama/yield-server/blob/master/src/adaptors/convex-finance/index.js
async function checkCvxAPY(chain, poolAddress) {
  try {
    if (!poolAddress) return { data: 0, err: null };
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, StakeABI, provider);
    const rewardRate = await POOL.rewardRate();
    const crvPerUnderlying = rewardRate / 10 ** 18;
    const crvPerYear = crvPerUnderlying * 86400 * 365;
    let cvxPerYear = 0;
    let aprToDivideTVL = 0;
    const cvxSupplyInfo = await checkPoolSupply(chain, CVX_ADDRESS);
    if (cvxSupplyInfo.err) throw new Error(cvxSupplyInfo.err.message);
    const cvxSupply = cvxSupplyInfo.data;
    const currentCliff = cvxSupply / cliffSize;
    if (currentCliff < cliffCount) {
      // get remaining cliffs
      let remaining = cliffCount - currentCliff;
      // multiply ratio of remaining cliffs to total cliffs against amount CRV received
      let cvxEarned = (crvPerYear * remaining) / cliffCount;
      // double check we have not gone over the max supply
      let amountTillMax = maxSupply - cvxSupply;
      if (cvxEarned > amountTillMax) {
        cvxEarned = amountTillMax;
      }
      cvxPerYear = cvxEarned;
    }
    if (cvxPerYear > 0) {
      const cvxInfo = await getGeckoTokenPrice(chain, CVX_ADDRESS);
      if (cvxInfo.err) {
        throw new Error(
          `Data from Curve V2 indexer not ok for CVX token price for ${poolAddress}`,
        );
      }
      const cvxPrice = cvxInfo.data;
      aprToDivideTVL = cvxPerYear * cvxPrice * 100;
    }
    return { data: aprToDivideTVL, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = checkCvxAPY;
