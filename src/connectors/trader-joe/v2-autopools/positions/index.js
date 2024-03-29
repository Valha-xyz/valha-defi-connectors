/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { GAUGEABI } = require('../abi/GAUGE');
const STAKINGPID = require('../interactions/STAKINGPID');

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
  const abi = GAUGEABI;
  const pid = await STAKINGPID(pool_address);
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

/// stakePosition
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
  const abi = GAUGEABI;
  const { data, err } = await STAKINGPID(chain, staking_address, pool_address);
  if (err) throw new Error(err.message);
  const pid = data;
  const method_name = 'pendingTokens';
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

module.exports = {
  stakePosition,
  claimableRewards,
  boostRewards: null,
};
