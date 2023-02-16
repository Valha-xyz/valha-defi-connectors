/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
import { getGeckoTokenPrice } from 'src/utils/prices/getGeckoTokenPrice';
import { StakeABI } from '../abi/Stake';
const { erc20Decimals } = require('../../../../../utils/ERC20Decimals');

const CVX_ADDRESS = '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b';

async function checkCvxAPY(chain, poolAddress) {
  try {
    if (!poolAddress) return { data: 0, err: null };
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, StakeABI, provider);
    let cvxPerYear = 0;
    let aprToDivideTVL = 0;
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
          `Data from Curve V2 indexer not ok for CVX token price for ${poolAddress}`
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
