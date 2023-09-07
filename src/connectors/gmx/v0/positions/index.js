/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { GLPABI } = require('../abi/GLP');
const { FEEABI } = require('../abi/FEE');

/// stakePosition
async function stakeRewards_esgmx(
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
  const abi = GLPABI;
  const method_name = 'claimable';
  const args = [userAddress];
  const interaction_address = pool_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: 0, // position of the information if return is a tupple or an array
  };
}


async function stakeRewards_weth(
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
  const abi = FEEABI;
  const method_name = 'claimable';
  const args = [userAddress];
  const interaction_address = metadata.weth_rewards;

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
  stakeRewards_esgmx,
  stakeRewards_weth,
  boostRewards: null,
};
