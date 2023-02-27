export function hexHashToInt (hash: string): number {
  if (hash.length !== 64) {
    return -1
  }
  const num = parseInt(hash, 16)
  return num
}
