export interface Pool {
  name: string;
  chain: string;
  underlying_tokens: string[];
  pool_address: string;
  investing_address: string;
  staking_address: string;
  boosting_address: null;
  distributor_address: null;
  rewards_tokens: string[];
  metadata: {};
}
