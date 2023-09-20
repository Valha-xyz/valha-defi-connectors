import { erc20Decimals } from '../../../../../utils/ERC20Decimals';
import { PoolTokenABI } from '../../abi/PoolToken';
import ERC20ABI from '../../../../../utils/abi/ERC20.json';
import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';
import { gql, request } from 'graphql-request';
import { getNodeProvider } from '../../../../../utils/getNodeProvider';
import { DataNumberResponse } from '../../../../../utils/types/utils';

const YEAR_IN_DAYS = 365;
const SECOND_IN_MS = 1000;
const DAY_IN_SECONDS = 24 * 60 * 60;
const PRECISION = 10 ** 10;
const APY_PRECISION = 10_000;
const LENDER_ADDRESS = '0xa606dd423dF7dFb65Efe14ab66f5fDEBf62FF583';
const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/mikemccready/truefi-legacy';

interface Loan {
  id: string;
  amount: typeof BigNumber;
  apy: number;
  poolAddress: string;
  status: string;
  startDate: number;
  endDate: number;
}

const getLoans = gql`
  {
    loans(first: 1000) {
      id
      amount
      APY
      poolAddress
      status
      startDate
      endDate
    }
  }
`;

function isLoanActive(status: string) {
  return status === '1' || status === '2';
}

async function getActiveLoans() {
  const { loans } = (await request(SUBGRAPH_URL, getLoans)) as any;
  const activeLoansRaw = loans.filter(({ status }) => isLoanActive(status));
  const activeLoans: Loan[] = activeLoansRaw.map(
    ({ amount, startDate, endDate, APY, ...rest }) => ({
      ...rest,
      apy: Number(APY),
      startDate: Number(startDate),
      endDate: Number(endDate),
      amount: new BigNumber(Number(amount)),
    }),
  );
  return activeLoans;
}

function getInterestForPeriod(periodInDays: number, apyInBps: number) {
  return 1 + (apyInBps / APY_PRECISION) * (periodInDays / YEAR_IN_DAYS);
}

async function getLoanWeightedApyValue(
  { apy, startDate, endDate, id }: Loan,
  nowInDays: number,
  provider: ethers.providers.BaseProvider,
) {
  if (nowInDays > endDate) {
    return new BigNumber(0);
  }

  const loanDuration = (endDate - startDate) / DAY_IN_SECONDS;
  const daysPassed = (nowInDays - startDate) / DAY_IN_SECONDS;

  const totalInterest = getInterestForPeriod(loanDuration, apy);
  const accruedInterest = getInterestForPeriod(daysPassed, apy);

  const loanTokenPrice = Math.floor(
    (accruedInterest / totalInterest) * PRECISION,
  );

  const LOAN = new ethers.Contract(id, ERC20ABI, provider);
  const lenderBalance = new BigNumber(
    (await LOAN.balanceOf(LENDER_ADDRESS)).toString(),
  );

  const scaledAmount = lenderBalance
    .multipliedBy(loanTokenPrice)
    .div(PRECISION);
  const loanAPYValue = scaledAmount.multipliedBy(apy);
  return loanAPYValue;
}

async function getPoolApyBase(
  poolLoans: Loan[],
  poolValue: number,
  tokenDecimals: number,
  provider: ethers.providers.BaseProvider,
) {
  const nowInDays = Date.now() / SECOND_IN_MS;
  const loanWeightedApyValues = await Promise.all(
    poolLoans.map(
      async (loan) => await getLoanWeightedApyValue(loan, nowInDays, provider),
    ),
  );
  const loansWeightedApySum = loanWeightedApyValues.reduce(
    (sum, value) => sum.plus(value),
    new BigNumber(0),
  );
  const poolApyBaseInBps =
    loansWeightedApySum.div(poolValue).toNumber() / 10 ** tokenDecimals;
  return poolApyBaseInBps;
}

export async function checkTruefiV2APY(
  chain: string,
  poolAddress: string,
): Promise<DataNumberResponse> {
  try {
    const provider = getNodeProvider(chain);
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const decimals = await erc20Decimals(provider, poolAddress);
    const poolValueBN = await POOL.poolValue();
    const poolValue = poolValueBN / 10 ** 1;
    const loans = await getActiveLoans();
    const apy = await getPoolApyBase(loans, poolValue, decimals, provider);
    const apyResult = apy * 1000;
    return { data: apyResult, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

// export async function checkTruefiV2APY(
//   db: SupabaseClient,
//   poolAddress: string,
// ): Promise<DataNumberResponse> {
//   try {
//     const { data, error } = await db.rpc('getapy', {
//       address_input: poolAddress,
//     });
//     if (error) throw new Error(error.message);
//     let apy = data as unknown as number;
//     if (Number.isNaN(apy)) {
//       apy = 0;
//     }
//     return { data: apy, err: null };
//   } catch (err) {
//     console.log(err.message);
//     return { data: null, err: err };
//   }
// }
