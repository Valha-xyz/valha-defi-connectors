import { BigNumber } from "ethers";
import { Chain } from "./networks";

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
  metadata: object;
}

export interface Amount {
  humanValue: string;
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
  other?: any;
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
  abi: any; // JSON file that represent a contract ABI
  method_name: string; // method to interact with the pool
  position_token: string; // token needed to approve
  position_token_type: "ERC-20" | "ERC-721" | "CUSTOM"; // token type to approve
  interaction_address: string; // contract to interact with to interact with poolAddress
  amount?: string; // amount that will be use in the ERC20 approve tx of the position token if it is an ERC20 or that will be use as the 'value' of the transaction
  args: any[]; // arguments to pass to the smart contracts to trigger 'method_name'
}

export type InteractionFunction = (
  pool: Pool,
  amount: AmountInput,
  addresses: AddressesInput,
  options?: AdditionalOptions
) => Promise<InteractionsReturnObject>;

export type Interactions = Record<string, InteractionFunction>;
