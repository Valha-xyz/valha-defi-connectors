import { BigNumber, BigNumberish } from "ethers";
import pMap from "p-map";
import {
  GetMinimumRedeemExport,
  InputAmounts,
} from "../src/utils/types/liquidityProviders";
import { getPool } from "../src/utils/accessors";
import { GetQuoteTypeExport } from "../src/utils/types/quotePrice";

// We want to get out of a pool and get tokens back, what can we expect ?
async function getPoolExitAmounts(
  tokenOut: string,
  amount: BigNumberish,
  poolAddress: string,
  poolType: string,
  swapType: string,
): Promise<BigNumber> {
  const pool = await getPool(poolAddress, poolType);
  if(!pool){
    throw "Pool not found"
  }
  // We get the maximum redeem asset
  const { getMinimumRedeem }: GetMinimumRedeemExport = await import(
    `../src/connectors/${poolType}/analytics/liquidity-pool/getMinimumRedeem`
  );

  const minimumRedeem = await getMinimumRedeem(amount, pool);

  //2. Then we swap all those tokens out to the tokenOut
  const { getQuotePrice }: GetQuoteTypeExport = await import(
    `../src/connectors/${swapType}/analytics/liquidity-pool/getQuotePrice`
  );

  // For all out tokens with a non-zero amount, we try to swap
  const allSwapResults = await pMap(pool.underlying_tokens, (token, i) => {
    if(minimumRedeem[i] && !minimumRedeem[i]?.isZero()){
      return getQuotePrice(token, minimumRedeem[i],tokenOut, pool.chain)
    }else{  
      return BigNumber.from(0)
    }
  });

  return allSwapResults.reduce((acc, v)=> acc.add(v), BigNumber.from(0));
}
/*
getPoolExitAmounts(
  "0x4200000000000000000000000000000000000006", // 18 decimals
  "1000000000000000000",
  "0xd16232ad60188b68076a235c65d692090caba155",
  "velodrome/v0", // Pool Type
  "oneinch/v5" // Swap Type
).then((response) => console.log(response));

getPoolExitAmounts(
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // 18 decimals - stWEth - 1500$
  "1000000000000000000", // Amount
  "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490", // Pool address
  "curve/v2", // Pool type
  "oneinch/v5" // Swap Type
).then((response) => console.log(response));
*/
/*
getPoolExitAmounts(
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // 18 decimals
  "1000",
  "0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f",
  "uniswap/v2", // Pool Type
  "oneinch/v5" // Swap Type
).then((response) => console.log(response));
*/