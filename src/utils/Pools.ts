export interface Pools {
  name: string;
  chain: "ethereum" | "polygon";
  underlying_tokens: string[];
  pool_address: string;
  investing_address?: string;
  staking_address?: string;
  boosting_address?: string;
  distributor_address?: string;
  rewards_tokens?: string[];
  metadata: {};
}
