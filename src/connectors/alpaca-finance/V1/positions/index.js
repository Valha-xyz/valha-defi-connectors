/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { StakingABI } = require('../abi/FairLaunch');
const PID = require('../interactions/PID');

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
  const abi = StakingABI;
  const pid = PID[pool_address.toLowerCase()];
  const method_name = 'userInfo';
  const args = [pid, userAddress];
  const interaction_address = staking_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: 0, // position of the information if return is a tupple or an array
  };
}

/// claimableRewards
async function claimableRewards(
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
  const pid = PID[pool_address.toLowerCase()];
  const method_name = 'pendingAlpaca';
  const args = [pid, userAddress];
  const interaction_address = staking_address;

  console.log(staking_address);

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
  };
}

module.exports = {
  stakePosition,
  claimableRewards,
  boostRewards: null,
};
