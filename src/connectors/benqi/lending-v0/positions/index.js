/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { RewardsABI } = require('../abi/Rewards');

/// stakeRewards
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
  receiverAddress
) {
  const abi = DistributorABI;
  const method_name = 'rewardAccrued';
  const args = [0, userAddress]; // 0 for Qi, 1 for Avax
  const interaction_address = distributor_address;


  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position:  0, // position of the information if return is a tupple or an array
  };
}

// /// stakeRewards
async function extraRewards(
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
  receiverAddress
) {
  const abi = DistributorABI;
  const method_name = 'rewardAccrued';
  const args = [1, userAddress]; // 0 for Qi, 1 for Avax
  const interaction_address = distributor_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position:  0, // position of the information if return is a tupple or an array
  };
}

module.exports = {
  stakePosition: null,
  stakeRewards,
  extraRewards,
  boostRewards: null,
};
