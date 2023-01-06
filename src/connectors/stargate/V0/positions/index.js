/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const STAKEABI = require('../abi/LPStaking.json');
const STAKING_PID = require('../interactions/STAKINGPID');

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
  receiverAddress
) {
  const abi = STAKEABI;
  const pid = STAKING_PID[chain][pool_address.toLowerCase()];
  const method_name = 'userInfo';
  const args = [pid, userAddress];
  const interaction_address = staking_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to get the information
    interaction_address: interaction_address, // contract to check the information
    args: args, //args to pass to the smart contracts to trigger 'method_name'
    position: 0, //position of the information if return is a tupple or an array
  };
}

module.exports = {
  stakePosition: stakePosition,
  stakeRewards: null,
  boostRewards: null,
};
