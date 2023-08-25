import { config } from 'dotenv';
config();

export const RPC_PROVIDERS = {
  ethereum: process.env.rpc_ethereum || 'https://rpc.flashbots.net/',
  polygon: process.env.rpc_polygon || 'https://rpc-mainnet.maticvigil.com',
  bsc: process.env.rpc_bsc || 'https://bsc-dataseed.binance.org',
  arbitrum: process.env.rpc_arbitrum || 'https://rpc.ankr.com/arbitrum',
  optimism: process.env.rpc_optimism || 'https://mainnet.optimism.io',
  celo: process.env.rpc_celo || 'https://forno.celo.org/',
  avalanche:
    process.env.rpc_avalanche || 'https://api.avax.network/ext/bc/C/rpc',
  'bsc-testnet': 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  'arbitrum-testnet': 'https://goerli-rollup.arbitrum.io/rpc',
};
