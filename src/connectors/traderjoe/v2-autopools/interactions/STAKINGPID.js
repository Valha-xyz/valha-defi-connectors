


  async function STAKINGPID(chain, poolAddress, stakingAddress) {
    try {
      const provider = getNodeProvider(chain);
      if (!provider) throw new Error('No provider was found.');
      const Farm = new ethers.Contract(stakingAddress, GAUGEABI, provider);
      const PID = await Farm.vaultFarmId(poolAddress)
      return { data: PID, err: null };
    } catch (err) {
      console.log(err);
      return { data: null, err };
    }
  }
  
  module.exports = STAKINGPID;