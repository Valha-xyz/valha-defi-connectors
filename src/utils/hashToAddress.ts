export function hashToAddress(hash: string): string {
  if (hash.length !== 64) {
    console.log('NOT A HASH SO NO ADDRESS');
    return '';
  }
  const address = '0x' + hash.slice(hash.length - 40);
  return address;
}
