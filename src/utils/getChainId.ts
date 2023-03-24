const CHAIN_ID = {
  ethereum: 1,
  polygon: 137,
  bsc: 56,
  arbitrum: 42161,
  optimism: 10,
  celo: 42220,
  avalanche: 43114
}

export function getChainId (chain: string): Promise<number> {
  try {
    const id = CHAIN_ID[chain]
    if (!id) throw new Error(`Not found CHAIN_ID for ${chain}`)
    return id
  } catch (err) {
    console.log(err)
    return null
  }
}

export function getChainById (id: number): string {
  try {
    const chain = Object.keys(CHAIN_ID).find((key) => CHAIN_ID[key] === id)
    if (!chain) throw new Error(`Not found chain for ${id}`)
    return chain
  } catch (err) {
    console.log(err)
    return null
  }
}
