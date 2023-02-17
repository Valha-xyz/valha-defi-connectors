/* eslint-disable prettier/prettier */
import BigNumber from "bignumber.js";
import { gql, request } from "graphql-request";
const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/mikemccready/truefi-legacy";
const LOAN_FACTORY_2_START_BLOCK = 12467595;

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
  return status === "1" || status === "2";
}

async function getActiveLoans() {
  const { loans } = await request(
    SUBGRAPH_URL,
    getLoans.replace("<PLACEHOLDER>", String(LOAN_FACTORY_2_START_BLOCK))
  );
  const activeLoansRaw = loans.filter(({ status }) => isLoanActive(status));
  const activeLoans: Loan[] = activeLoansRaw.map(
    ({ amount, startDate, endDate, APY, ...rest }) => ({
      ...rest,
      apy: Number(APY),
      startDate: Number(startDate),
      endDate: Number(endDate),
      amount: new BigNumber(Number(amount)),
    })
  );
  return activeLoans;
}

export { getActiveLoans };
