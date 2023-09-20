import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { BigNumber, BigNumberish, Contract } from 'ethers';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
const { POOLABI } = require('../../abi/POOL');
const { ORACLEABI } = require('../../abi/ORACLE');
const ERC20ABI = require('../../../../../utils/abi/ERC20.json');
const ethers = require('ethers');
import { type Pool } from '../../../../../utils/types/connector-types';
import { type GetExchangeRateFunction } from '../../../../../utils/types/liquidityProviders';
import { toBnERC20DecimalsBN } from '../../../../../utils/toBNTokenDecimals';

// We only want to know the exchange rate between two assets.
// This should return the amount of token2 equivalent to amount1 token1
// In the best case scenario, this function does not need the amount1 parameter and only relies on pool reserves
// This function does not assume token1 != token2
export const getExchangeRate: GetExchangeRateFunction = async (
  amount1: BigNumber,
  token1: string,
  token2: string,
  pool: Pool,
): Promise<BigNumber> => {
  if (token1 == token2) {
    return amount1;
  }

  const provider = getNodeProvider(pool.chain);
  const liquidityProvidingContract = new Contract(
    pool.investing_address,
    POOLABI,
    provider,
  );

  // Get oracles prices

  const OracleX = await liquidityProvidingContract.getOracleX();
  const OracleY = await liquidityProvidingContract.getOracleY();

  const OracleXContract = new Contract(OracleX, ORACLEABI, provider);
  const OracleYContract = new Contract(OracleY, ORACLEABI, provider);

  const PriceX = await OracleXContract.latestAnswer();
  const decimalsOracleX = await OracleXContract.decimals();
  const PriceXModified = PriceX / 10 ** decimalsOracleX;

  const PriceY = await OracleYContract.latestAnswer();
  const decimalsOracleY = await OracleYContract.decimals();
  const PriceYModified = PriceY / 10 ** decimalsOracleY;

  // Get pool balances/reserves

  const TokenX = new ethers.Contract(
    pool.underlying_tokens[0],
    ERC20ABI,
    provider,
  );
  const decimalsX = await TokenX.decimals();

  const TokenY = new ethers.Contract(
    pool.underlying_tokens[1],
    ERC20ABI,
    provider,
  );
  const decimalsY = await TokenY.decimals();

  const Balances = await liquidityProvidingContract.getBalances();

  const BalanceX = Balances.amountX / 10 ** decimalsX;
  const BalanceY = Balances.amountY / 10 ** decimalsY;
  console.log('TRADEEEEER');
  console.log(BalanceX);
  console.log(BalanceY);

  const scaleBN = await toBnERC20DecimalsBN('1', pool.chain, token1);
  const amount1NoBN = amount1.div(scaleBN).toNumber();
  console.log('AMOUNT 1: ');
  console.log(amount1NoBN);

  const amount2 =
    (amount1NoBN * (BalanceY * PriceYModified)) / (BalanceX * PriceXModified);

  console.log('AMOUNT 2: ');
  console.log(amount2);

  // Get the two together balances/reserves

  const BalanceYModified = BalanceY * PriceYModified;
  const BalanceXModified = BalanceX * PriceXModified;

  console.log('AMOUNT1NoBN:');
  console.log(amount1NoBN);
  console.log(BalanceYModified);
  console.log(BalanceXModified);
  const amountToRetNotBN = (amount1NoBN * BalanceYModified) / BalanceXModified;
  console.log(amount1NoBN);
  const amountToReturn = await toBnERC20DecimalsBN(
    String(amountToRetNotBN),
    pool.chain,
    pool.underlying_tokens[1],
  );
  console.log('AMOUNT1');
  console.log(amountToReturn.toString());

  return amountToReturn;
};
