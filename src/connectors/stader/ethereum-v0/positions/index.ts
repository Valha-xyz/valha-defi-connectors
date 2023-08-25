/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { WithdrawABI } = require('../abi/WithdrawPool');

/// stakePosition
async function withdrawablePosition(
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
  const abi = WithdrawABI;
  const method_name = 'getRequestIdsByUser';

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

module.exports = {
  withdrawablePosition,
  stakeRewards: null,
  boostRewards: null,
};
