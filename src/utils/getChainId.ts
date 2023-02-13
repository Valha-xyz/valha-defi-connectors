const CHAIND_ID = {
  ethereum: 1,
  polygon: 137,
  bsc: 56,
  arbitrum: 42161,
  optimism: 10,
  celo: 42220,
  avalanche: 43114,
};

export async function getChainId(chain: string): Promise<number> {
  try {
    const id = CHAIND_ID[chain];
    if (!id) throw new Error(`Not found CHAIN_ID for ${chain}`);
    return id;
  } catch (err) {
    console.log(err);
    return null;
  }
}
