export async function getWombatPid(poolAddress) {
  try {
    const provider = await getNodeProvider('bsc');
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(MasterAddress, MasterABI, provider);
    const idBN = await POOL.getAssetPid(poolAddress);
    return idBN.toString();
  } catch (err) {
    console.log(err);
    return null;
  }
}
