/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { ROUTERABI } = require('../abi/Router');

/// poolPosition (it's not a token but a mapping)
async function poolPosition(
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
  const abi = ROUTERABI;
  const method_name = 'balanceOf';
  const args = [userAddress];
  const interaction_address = pool_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position, // position of the information if return is a tupple or an array
  };
}

/// boostPosition
async function boostPosition(
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
  const abi = ROUTERABI;
  const method_name = 'getBoostingBlidAmount';
  const args = [userAddress];
  const interaction_address = boosting_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position, // position of the information if return is a tupple or an array
  };
}

async function boostRewards(
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
  const abi = ROUTERABI;
  const method_name = 'getBoostingClaimableBLID';
  const args = [userAddress];
  const interaction_address = boosting_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position, // position of the information if return is a tupple or an array
  };
}

module.exports = {
  boostPosition,
  claimableRewards: null,
  boostRewards,
};
