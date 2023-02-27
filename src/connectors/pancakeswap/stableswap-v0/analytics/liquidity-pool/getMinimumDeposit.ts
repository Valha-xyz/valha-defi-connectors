import { BigNumber, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';

import RouterABI from '../../abi/router.json';
import { type Pool } from '../../../../../utils/types/connector-types';
import { findTokenPosition } from './getQuotePrice';

export const getMinimumDeposit = async (
  amount1: BigNumber,
  token1: string, // Token OF THE POOL that you will actually enter with
  pool: Pool
): Promise<BigNumber> => {
  const provider = getNodeProvider(pool.chain);
  const poolContract = new Contract(
    pool.investing_address,
    RouterABI.map((el) => ({
      ...el,
      gas: el.gas?.toString(),
    })),
    provider
  );

  const poolSize = pool.underlying_tokens.length;
  const amounts = Array.from({ length: poolSize }, (v) => BigNumber.from(0));

  amounts[await findTokenPosition(token1, pool, poolContract)] = amount1;

  return poolContract.calc_token_amount(amounts, true);
};

/*
getMinimumDeposit(
  BigNumber.from("1000000000000000000"),
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  {
    "name": "Curve.fi DAI/USDC/USDT",
    "chain": "ethereum",
    "underlying_tokens": [
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    ],
    "pool_address": "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490",
    "investing_address": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    "staking_address": "0xbfcf63294ad7105dea65aa58f8ae5be2d9d0952a",
    "boosting_address": null,
    "distributor_address": null,
    "rewards_tokens": ["0xd533a949740bb3306d119cc777fa900ba034cd52"],
    "metadata": {
      "id": "0"
    }
  },
).then((respons)=> console.log(respons.toString()))
*/
