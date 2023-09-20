/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { POOLABI } from '../abi/pool';

/// lockPosition
async function lockPositions(
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
  const abi = POOLABI;
  const method_name = 'getUserLocks';
  const args = [userAddress];
  const interaction_address = pool_address;
  const locked_tokens = underlying_tokens;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: null, // position of the information if return is a tupple or an array
    locked_tokens,
  };
}

module.exports = {
  stakePosition: null,
  claimableRewards: null,
  boostRewards: null,
  lockPositions,
};
