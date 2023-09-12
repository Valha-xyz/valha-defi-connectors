/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { StakeABI } = require('../abi/Stake');

/// stakePosition
async function stakePosition(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  userAddress,
  receiverAddress,
) {
  const abi = StakeABI;
  const method_name = 'balanceOf';
  const args = [userAddress];
  const interaction_address = staking_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: 0, // position of the information if return is a tupple or an array
  };
}

async function stakeRewards(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  userAddress,
  receiverAddress,
) {
  const abi = StakeABI;
  const method_name = 'earned';
  const args = [userAddress];
  const interaction_address = staking_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: 0, // position of the information if return is a tupple or an array
  };
}

// /// stakeRewards
// async function extraRewards(
//   pool_name,
//   chain,
//   underlying_tokens,
//   pool_address,
//   investing_address,
//   staking_address,
//   boosting_address,
//   distributor_address,
//   rewards_tokens,
//   metadata,
//   userAddress,
//   receiverAddress
// ) {
//   const abi = ExtraABI;

//   const provider = getNodeProvider(chain);
//   if (!provider) throw new Error('No provider was found.');
//   const POOL = new ethers.Contract(pool_address, PoolABI, provider);
    

//   const extraRewardLengths = await POOL.extraRewardsLength();
//   let rewardApyExtra = [];
//   let extraAddresses = [];

//   for (let x = 0; x < extraRewardLengths; x++) {
//     const extraRewardAddress = await POOL.extraRewards(x);
//     const extraContract = new ethers.Contract(extraRewardAddress, ExtraABI, provider)
//     const extraEarned =extraContract.earned(userAddress);
//     rewardApyExtra.push(extraEarned);
//     extraAddress.push(extraRewardAddress);}


//   const method_name = 'earned';
//   const args = [userAddress];
//   const interaction_addresses = extraAddresses


//   return {
//     abi, // json file name
//     method_name, // method to get the information
//     interaction_addresses, // contract to check the information
//     args, // args to pass to the smart contracts to trigger 'method_name'
//     position:  0, // position of the information if return is a tupple or an array
//   };
// }

module.exports = {
  stakePosition,
  stakeRewards,
  extraRewards: null,
  boostRewards: null,
};
