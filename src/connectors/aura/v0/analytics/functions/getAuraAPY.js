/* eslint-disable @typescript-eslint/no-var-requires */
const { getNodeProvider } = require('../../../../../utils/getNodeProvider');
const ethers = require('ethers');
import { PoolABI } from '../../abi/Pool';
import { MiningABI } from '../../abi/Mining';
import { ExtraABI } from '../../abi/Extra';

const pools = require('../../../../aura/v0/pools/pools');
const _ = require('lodash');

// import { ROUTERABI } from '../../../../balancer/v2/abi/ROUTERABI';

const axios = require('axios');

// Others

const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
const auraRewardsCalculator = {
  ethereum: "0x744Be650cea753de1e69BF6BAd3c98490A855f52",
  arbitrum: "0x52A7239eDa381264b8c24cB11d7dF343236007Aa",
  optimism: "0x6306B10E032f9f81D3279D52FAaf6b0cdb53292a",
  polygon: "",
}

// All the logic inspired by DefiLlama work here:https://github.com/DefiLlama/yield-server/blob/master/src/adaptors/aura/index.js
async function getAuraAPY(chain, poolAddress, tvl) {
  try {
    // Token price constant
    const auraAddress = "0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF";
    const balAddress =  "0xba100000625a3754423978a60c9317c58a424e3D";
    const start_URL = "https://coins.llama.fi/prices/current/";
    const aura_key = "ethereum:" + auraAddress;
    const bal_key = "ethereum:" + balAddress;
    const responseAura = await axios.get(start_URL + aura_key);
    const auraPrice = responseAura.data.coins[aura_key].price;
    const responseBal = await axios.get(start_URL + bal_key);
    const balPrice = responseBal.data.coins[bal_key].price; 
    
    //Find TVL thanks to LP Token
    const POOLS = await pools();
    if (!POOLS || POOLS.length === 0) return {};
    const poolInfo = _.find(POOLS, (elem) => {
      return elem.pool_address.toLowerCase() === poolAddress.toLowerCase();
    });

    const underlyingToken = poolInfo.underlying_tokens[0];

    


    if (!poolAddress) return { data: 0, err: null };
    const provider = getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolABI, provider);
    const Calculator = new ethers.Contract(auraRewardsCalculator[chain], MiningABI, provider);

    // Reward APY: auraAPY + balAPY + extrarewAPY

    // balAPY

    const balRewardRate = await POOL.rewardRate();
    const balAPY = ((balRewardRate * SECONDS_PER_YEAR * balPrice) / 1e18)/tvl;

   
    // auraAPY

    const auraRewardRate = await Calculator.convertCrvToCvx(balRewardRate);
    const auraAPY = ((auraRewardRate * SECONDS_PER_YEAR *auraPrice)/1e18)/tvl;

    // extrarewAPY
    const extraRewardLengths = await POOL.extraRewardsLength();

    let rewApyExtra = 0;
    let tableApyExtra = [];
    let tableTokenExtra = [];
    for (let x = 0; x < extraRewardLengths; x++) {
      const extraRewardAddress = await POOL.extraRewards(x);
      const extraContract = new ethers.Contract(extraRewardAddress, ExtraABI, provider);
      const extraRewardRate = await extraContract.rewardRate();
      const extraTokenAddress = await extraContract.rewardToken();

      const price_key = chain + ":" + extraTokenAddress;
      const response = await axios.get(start_URL + price_key);


      let tokenPrice = 0;
      if (response.data.coins.length > 0){
        tokenPrice = response.data.coins[price_key].price;
      }

      const rewApyToken = (((extraRewardRate / 1e18) * 86400 * 365 * tokenPrice) / tvl) * 100;
      rewApyExtra = rewApyExtra + rewApyToken;
      tableApyExtra.push(rewApyToken);
      tableTokenExtra.push(extraTokenAddress);
    }

    // Activity APY

    const URL = "https://cache.aura.finance/aura/aprs-deprecated"

    const activity = await axios.get(URL);
    const desiredPool = activity.data.pools.filter(pool => pool.id.startsWith(underlyingToken));
    const actApy = desiredPool[0].poolAprs.swap;

    return { data: {actApy: actApy, rewApyBal: balAPY, rewApyAura: auraAPY, rewApyExtra: rewApyExtra, 
      detailApyExtra: tableApyExtra, addressTokenExtra: tableTokenExtra}, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

module.exports = getAuraAPY;
