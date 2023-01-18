/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const PoolABI = require("../abi/stablePool");

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
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = PoolABI;
  const method_name = "add_liquidity";
  const amountBN = amountNotBN;
  const args = [amounts: uint256[N_COINS], min_mint_amount: uint256];
  const interaction_address = pool_address;

  const pools = [
    "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7",
    "0xFd2a8fA60Abd58Efe3EeE34dd494cD491dC14900",
    "0xA96A65c051bF88B4095Ee1f2451C2A9d43F53Ae2",
    "0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27",
    "0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B",
    "0xeB21209ae4C2c9FF2a86ACA31E123764A3B6Bc06",
    "0x0Ce6a5fF5217e38315f87032CF90686C96627CAA",
    "0x4CA9b3063Ec5866A4B82E437059D2C43d1be596F",
    "0x2dded6Da1BF5DBdF597C45fcFaa3194e53EcfeAF",
    "0xF178C0b5Bb7e7aBF4e12A4838C7b7c5bA2C623c0",
    "0xA50cCc70b6a011CffDdf45057E39679379187287",
    "0xD905e2eaeBe188fc92179b6350807D8bd91Db0D8",
    "0x49849C98ae39Fff122806C06791Fa73784FB3675",
    "0x53a901d48795C58f485cBB38df08FA96a24669D5",
    "0x02d341CcB60fAaf662bC0554d13778015d1b285C",
    "0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3",
    "0xA3D87FffcE63B53E0d54fAa1cc983B7eB0b74A9c",
    "0x06325440D014e39736583c165C2963BA99fAf14E",
    "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD",
    "0x80466c64868E1ab14a1Ddf27A676C3fcBE638Fe5",
    "0xcA3d75aC011BF5aD07a98d02f18225F9bD9A6BDF",
    "0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C",
    "0xbBC81d23Ea2c3ec7e56D39296F0cbB648873a5d3",
    "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
    "0x571FF5b7b346F706aa48d696a9a4a288e9Bb4091"
  ]

  const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/i25CEzZu6JD-2uH08tSkKRJKzGts26PE");
  pools.forEach((addr) => {
    const pool = new ethers.Contract(addr, abi, provider);
    console.log(await pool.coins(0));
    console.log(await pool.coins(1));
    console.log(await pool.coins(2));
  })

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: underlying_tokens[0], // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
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
  userAddress,
  receiverAddress,
  lockupTimestamp,
  deadline
) {
  const abi = PoolABI;
  const method_name = "redeem";
  const amountBN = "";
  const args = [];
  const interaction_address = "";


  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
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
  user_address,
  receiver_address,
  lockup_timestamp
) {
  const abi = "";
  const method_name = "stake";
  const amountBN = "";
  const args = [];
  const interaction_address = "";

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
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
  user_address,
  receiver_address,
  lockup_timestamp
) {
  const abi = "";
  const method_name = "unstake";
  const args = [];
  const amountBN = "";
  const interaction_address = "";

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// claimRewards
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
  user_address,
  receiver_address,
  lockup_timestamp
) {
  const abi = "";
  const method_name = "claim";
  const amountBN = "";
  const args = [];
  const interaction_address = "";

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: "ERC-20", //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN,
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
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
  claim_rewards: claimRewards,
  claim_interests: null,
};
