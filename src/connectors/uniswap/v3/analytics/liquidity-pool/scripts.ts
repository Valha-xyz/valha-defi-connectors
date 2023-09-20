import { CurrencyAmount, Percent, Token } from '@uniswap/sdk-core';
import {
  type CollectOptions,
  NonfungiblePositionManager,
  Pool as UNISWAP_POOL,
  Position,
  type RemoveLiquidityOptions,
} from '@uniswap/v3-sdk';
import { ethers } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { type Pool } from '../../../../../utils/types/connector-types';
import { getChainId } from '../../../../../utils/getChainId';
import { erc20Decimals } from '../../../../../utils/ERC20Decimals';

// https://docs.uniswap.org/sdk/v3/guides/liquidity/modifying-position
// getRemoveLiquidityMinimumAmounts get the expected underlying tokens you can get when withdrawing 100% of the position stored in tokenId
// You can adapt the parameters you want for withdrawing in the removeLiquidityOptions object
// Some help here if you don't understand what is going on : https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L176

export async function getRemoveLiquidityMinimumAmounts(
  chain: string,
  pool: Pool,
  userAddress: string,
  tokenId: string,
) {
  const provider = getNodeProvider(chain);
  const poolInfo = await getPoolInfo(chain, pool.pool_address);

  const token0 = new Token(
    await getChainId(chain),
    poolInfo.token0,
    await erc20Decimals(provider, poolInfo.token0),
  );
  const token1 = new Token(
    await getChainId(chain),
    poolInfo.token1,
    await erc20Decimals(provider, poolInfo.token1),
  );

  const currentPosition = await constructPosition(chain, pool, tokenId);

  const collectOptions: Omit<CollectOptions, 'tokenId'> = {
    expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(token0, 0),
    expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(token1, 0),
    recipient: userAddress,
  };
  const removeLiquidityOptions: RemoveLiquidityOptions = {
    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    slippageTolerance: new Percent(50, 10_000),
    tokenId,
    // percentage of liquidity to remove
    liquidityPercentage: new Percent(100),
    collectOptions,
  };
  const { calldata, value } = NonfungiblePositionManager.removeCallParameters(
    currentPosition,
    removeLiquidityOptions,
  );
  const multiCallData = NonfungiblePositionManager.INTERFACE.decodeFunctionData(
    'multicall',
    calldata,
  );
  const decreaseData = NonfungiblePositionManager.INTERFACE.decodeFunctionData(
    'decreaseLiquidity',
    multiCallData.data[0],
  );
  return {
    amount0Min: decreaseData.params.amount0Min,
    amount1Min: decreaseData.params.amount1Min,
  };
}

export async function constructPosition(
  chain: string,
  pool: Pool,
  tokenId: string,
): Promise<Position> {
  // get pool info

  const provider = getNodeProvider(chain);
  const poolInfo = await getPoolInfo(chain, pool.pool_address);

  const token0 = new Token(
    await getChainId(chain),
    poolInfo.token0,
    await erc20Decimals(provider, poolInfo.token0),
  );
  const token1 = new Token(
    await getChainId(chain),
    poolInfo.token1,
    await erc20Decimals(provider, poolInfo.token1),
  );

  // construct pool instance
  const configuredPool = new UNISWAP_POOL(
    token0,
    token1,
    poolInfo.fee,
    poolInfo.sqrtPriceX96.toString(),
    poolInfo.liquidity.toString(),
    poolInfo.tick,
  );

  const NFTManager = new ethers.Contract(
    pool.investing_address,
    NonfungiblePositionManager.INTERFACE,
    provider,
  );

  const tokenInfo = await NFTManager.positions(tokenId);

  const position = new Position({
    pool: configuredPool,
    liquidity: tokenInfo.liquidity,
    tickLower: tokenInfo.tickLower,
    tickUpper: tokenInfo.tickUpper,
  });
  return position;
}

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: ethers.BigNumber;
  liquidity: ethers.BigNumber;
  tick: number;
}

export async function getPoolInfo(
  chain: string,
  poolAddress: string,
): Promise<PoolInfo> {
  const provider = getNodeProvider(chain);

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI.abi,
    provider,
  );

  const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);

  return {
    token0,
    token1,
    fee,
    tickSpacing,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}

getRemoveLiquidityMinimumAmounts(
  'ethereum',
  {
    name: 'Uniswap - Wrapped Ether LP',
    chain: 'ethereum',
    underlying_tokens: [
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ],
    pool_address: '0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801',
    investing_address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    staking_address: null,
    boosting_address: null,
    distributor_address: null,
    rewards_tokens: null,
    metadata: {
      fee: '3000',
    },
  },
  ethers.constants.AddressZero,
  '1',
).then((response) => {
  console.log(response);
});
