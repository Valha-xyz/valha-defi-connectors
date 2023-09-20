/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DistributorABI } from '../abi/Distributor';
import { PoolABI } from '../abi/Pool';

/// Check debt eligibility
async function debtEligibility(
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
  const abi = PoolABI;
  const method_name = 'getUserAccountData';
  const args = [userAddress];
  const interaction_address = investing_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: 2, // position of the information if return is a tupple or an array
  };
}

/// Check debt eligibility
async function debtPosition(
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
  const abi = PoolABI;
  const method_name = 'getUserAccountData';
  const args = [userAddress];
  const interaction_address = investing_address;

  return {
    abi, // json file name
    method_name, // method to get the information
    interaction_address, // contract to check the information
    args, // args to pass to the smart contracts to trigger 'method_name'
    position: null, // position of the information if return is a tupple or an array
    positions: [1, 3, 4, 5],
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
  const abi = DistributorABI;
  const method_name = 'getAllUserRewards';
  const args = [[pool_address], userAddress];
  const interaction_address = distributor_address;

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
  claimableRewards: claimableRewards,
  boostRewards: null,
  debtEligibility,
  debtPosition,
};
