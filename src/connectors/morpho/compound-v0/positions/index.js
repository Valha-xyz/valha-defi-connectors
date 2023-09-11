/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { DistributorABI } = require('../abi/Distributor');

/// stakePosition
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
  const abi = DistributorABI;
  const method_name = 'userUnclaimedCompRewards';
  const args = [userAddress];
  const interaction_address = distributor_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: 0, // position of the information if return is a tupple or an array
  };
}



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
  receiverAddress,
) {
  const abi = StakingABI;
  const method_name = 'getUserClaimableRewards';
  const args = [userAddress,rewards_tokens];
  const interaction_address = staking_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: 0, // position of the information if return is a tupple or an array
  };
}

module.exports = {
  stakePosition: null,
  stakeRewards,
  boostRewards: null,
};
