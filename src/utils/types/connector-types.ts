import { BigNumber } from "ethers";
import { Chain } from "./networks";
import { Amount, AssetInfo, TxInfo } from "./utils";

export interface Pool {
  name: string;
  chain: Chain | string;
  underlying_tokens: string[];
  pool_address: string;
  investing_address: string;
  staking_address: string | null;
  boosting_address: string | null;
  distributor_address: string | null;
  rewards_tokens: string[] | null;
  metadata: any;
}

export interface AmountInput {
  amount: Amount;
  amountsDesired?: Amount[];
  amountsMinimum?: Amount[];
}

export interface AddressesInput {
  userAddress: string;
  receiverAddress: string;
}

export interface AdditionalOptions {
  ranges: any[];
  rangeToken: any;
  lockupTimestamp: any;
  deadline: any;
  other?: any; // Or metadata ? Not used for now
}

export interface Analytics {
  status: boolean | null;
  tvl: number | null;
  liquidity: number | null;
  outloans: number | null;
  losses: number | null;
  capacity: number | null;
  apy: number | null;
  activity_apy: number | null;
  rewards_apy: number | null;
  boosting_apy: number | null;
  share_price: number | null;
  minimum_deposit: number | null;
  maximum_deposit: number | null;
}

export interface InteractionsReturnObject {
  txInfo: TxInfo;
  assetInfo: AssetInfo | null;
}

export enum InteractionFunctionNames {
  deposit = "deposit",
  deposit_and_stake = "deposit_and_stake",
  unlock = "unlock",
  redeem = "redeem",
  stake = "stake",
  unstake = "unstake",
  boost = "boost",
  unboost = "unboost",
  claim_rewards = "claim_rewards",
  claim_interests = "claim_interests",
}

export type InteractionFunction = (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) => Promise<InteractionsReturnObject>;

export type Interactions = Record<
  InteractionFunctionNames,
  InteractionFunction
>;
