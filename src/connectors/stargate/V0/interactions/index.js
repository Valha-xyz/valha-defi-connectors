/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const ROUTERABI = require('../abi/Router.json');
const LPSTAKING = require('../abi/LPStaking.json');
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

const STAKING_POOLID = {
  //0xB0D502E938ed5f4df2E681fE6E419ff29631d62b
  ethereum: {
    '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56': 0,
    '0x38ea452219524bb87e18de1c24d3bb59510bd783': 1,
    '0x101816545f6bd2b1076434b54383a1e633390a2e': 2,
    '0x0faf1d2d3ced330824de3b8200fc8dc6e397850d': 3,
    '0xfa0f307783ac21c39e939acff795e27b650f6e68': 4,
    '0x590d4f8a68583639f215f675f3a259ed84790580': 5,
    '0xe8f55368c82d38bbbbdb5533e7f56afc2e978cc2': 6,
  },
  //0x8731d54E9D02c286767d56ac03e8037C07e01e98
  polygon: {
    '0x1205f31718499dbf1fca446663b532ef87481fe1': 0,
    '0x29e38769f23701a2e4a8ef0492e19da4604be62c': 1,
    '0x1c272232df0bb6225da87f4decd9d37c32f63eea': 2,
  },
  //0x3052A0F6ab15b4AE1df39962d5DdEFacA86DaB47
  bsc: {
    '0x9aa83081aa06af7208dcc7a4cb72c94d057d2cda': 0,
    '0x98a5737749490856b401db5dc27f522fc314a4e1': 1,
  },
  //0xeA8DfEE1898a7e0a59f7527F076106d7e44c2176
  arbitrum: {
    '0x892785f33cdee22a30aef750f285e18c18040c3e': 0,
    '0xb6cfcf89a7b22988bfc96632ac2a9d6dab60d641': 1,
    '0x915a55e36a01285a14f05de6e81ed9ce89772f8e': 2,
    '0xaa4bf442f024820b2c28cd0fd72b82c63e66f56c': 3,
  },
  //0x4DeA9e918c6289a52cd469cAC652727B7b412Cd2
  optimism: {
    '': 0,
    '': 1,
    '': 2,
    '': 3,
    '': 4,
    '': 5,
  },
};

const INVEST_POOLID = {
  //https://stargateprotocol.gitbook.io/stargate/developers/pool-ids
  ethereum: {
    '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56': 1,
    '0x38ea452219524bb87e18de1c24d3bb59510bd783': 2,
    '0x101816545f6bd2b1076434b54383a1e633390a2e': 13,
    '0x0faf1d2d3ced330824de3b8200fc8dc6e397850d': 3,
    '0xfa0f307783ac21c39e939acff795e27b650f6e68': 7,
    '0x590d4f8a68583639f215f675f3a259ed84790580': 14,
    '0xe8f55368c82d38bbbbdb5533e7f56afc2e978cc2': 15,
    '0x692953e758c3669290cb1677180c64183cee374e': 11,
    '0x9cef9a0b1be0d289ac9f4a98ff317c33eaa84eb8': 16,
  },
  polygon: {
    '0x1205f31718499dbf1fca446663b532ef87481fe1': 1,
    '0x29e38769f23701a2e4a8ef0492e19da4604be62c': 2,
    '0x1c272232df0bb6225da87f4decd9d37c32f63eea': 3,
    '0x8736f92646b2542b3e5f3c63590ca7fe313e283b': 16,
  },
  bsc: {
    '0x9aa83081aa06af7208dcc7a4cb72c94d057d2cda': 2,
    '0x98a5737749490856b401db5dc27f522fc314a4e1': 5,
    '0x4e145a589e4c03cbe3d28520e4bf3089834289df': 11,
    '0x7bfd7f2498c4796f10b6c611d9db393d3052510c': 16,
  },
  arbitrum: {
    '0x892785f33cdee22a30aef750f285e18c18040c3e': 1,
    '0xb6cfcf89a7b22988bfc96632ac2a9d6dab60d641': 2,
    '0xaa4bf442f024820b2c28cd0fd72b82c63e66f56c': 7,
    '0x915a55e36a01285a14f05de6e81ed9ce89772f8e': 13,
    '0xf39b7be294cb36de8c510e267b82bb588705d977': 16,
  },
  optimism: {
    '0xdecc0c09c3b5f6e92ef4184125d5648a66e35298': 1,
    '0x165137624f1f692e69659f944bf69de02874ee27': 3,
    '0x368605d9c6243a80903b9e326f1cddde088b8924': 7,
    '0xd22363e3762ca7339569f3d33eade20127d5f98c': 13,
    '0x2f8bc9081c7fcfec25b9f41a50d97eaa592058ae': 14,
    '0x3533f5e279bdbf550272a199a223da798d9eff78': 15,
    '0x5421fa1a48f9ff81e4580557e86c7c0d24c18036': 16,
  },
};

/// invest
async function deposit(
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const abi = ROUTERABI;
  const method_name = 'addLiquidity';
  const poolId = INVEST_POOLID[chain][pool_address.toLowerCase()];
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [poolId, amountBN, userAddress];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unlock
async function unlock() {
  return {};
}

/// redeem
async function redeem(
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const abi = ROUTERABI;
  const method_name = 'instantRedeemLocal';
  const poolId = INVEST_POOLID[chain][pool_address.toLowerCase()];
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [poolId, amountBN, userAddress];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// stake
async function stake(
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const poolId = STAKING_POOLID[chain][pool_address.toLowerCase()];
  const abi = LPSTAKING;
  const method_name = 'deposit';
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [poolId, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unstake
async function unstake(
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  const poolId = STAKING_POOLID[chain][pool_address.toLowerCase()];
  const abi = LPSTAKING;
  const method_name = 'withdraw';
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [poolId, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: null, //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// boost
async function boost(
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

/// unboost
async function unboost(
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

/// claim
async function claimRewards(
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
  amountNotBN,
  amountsDesiredNotBN,
  amountsMinimumNotBN,
  ranges,
  rangeToken,
  receiverAddress,
  lockupTimestamp
) {
  return {};
}

module.exports = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null,
};
