<div>
  <div align="center">
    <h1>Valha  </h1>
    <h2> DeFi Abstraction Connectors </h2>
    <img src="https://i.imgur.com/1jNxqt8.png" height="136" width="482">
    <br />
    <br />
    <a href="https://github.com/Valha-xyz/valha-defi-connectors/issues/new?assignees=&labels=bug&title=bug%3A+">Report a Bug</a>
    -
    <a href="https://github.com/Valha-xyz/valha-defi-connectors/issues/new?assignees=&labels=enhancement&title=feature%3A+">Request a Feature</a>
  </div>
  <details>
  <summary>Table of Contents</summary>

- [About](#about)
- [Use-cases](#why)
- [Integration Explanation](#integration-explanation)
- [Integrate a new Protocol](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Integration steps](#🚀-add-a-new-protocol)
- [Expected Return](#interface)
- [Example](#erc4626-example)
- [Advice](#advice)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements-)
- [Support](#support)
- [Assistance](#project-assistance)

  </details>
</div>

<div align="center">
<br />
</div>

<!-- ![Test Status](https://github.com/Valha-xyz/valha-defi-connectors/actions/workflows/test.yml/badge.svg) -->

<!-- ![Build Status](https://github.com/Valha-xyz/valha-defi-connectors/actions/workflows/file_check.yml/badge.svg) -->

---

## About

<div>
  <div align="center">
      <h1> Valha helps applications to access DeFi protocols by standardizing common interactions. </h1> 
  </div>
  <br>
  <div>
    More information in <a href="https://medium.com/@octavionotpunk/introducing-valha-the-defi-abstraction-layer-7303252423d3" target="_blank"> this article </a>
  </div>
</div>

## Why integrate on Valha?

### Protocols 🏗️🏗️🏗️

As a DeFi protocol, you can leverage your exposure to third-party distributors (wallets, dapps, investment platforms) by standardizing the access to your pools. It will reduce the time needed by these actors to integrate you whoever you are and therefore help you grow your number of users and TVL.

### DeFi Apps 💻💻💻

As a DeFi app (wallets, dapps, yield aggregators), you can easily integrate new DeFi protocols by exploring the connectors made by protocols. By integrating the DeFi ecosystem directly in your interface, users won't have to hop from interface to interface. It will improve their experience and reduce their probability of being hacked.

<br>

## Integration Explanation

To integrate a DeFi protocol, one needs to know what are the related pools, to know the current main statistics of the pools and to know how to interact with such pools.
Therefore, in the integration process, we have three main following parts that end up in three folders: Pools, Analytics & Interactions.

### Pools

In this folder, there will have a main function returning all the current pools related to the protocol (and the associated information) by developing functions to get all the pools related to the protocol.

### Analytics

In this folder, there will have a main function returning all analytics about a specific pool by developing functions to get all the statictis related to one pool of the protocol.

### Interaction

In this folder, there will have a main function returning all the information necessarty to interact with specific pool by developing functions to know how to make specific actions on a pool.

## Getting Started

To integrate a DeFi protocol to Valha, you have to follow the next few steps!

### Prerequisites

<a href="https://nodejs.org/en/download/" target="_blank"> Node (>16)</a>

  <!-- <br> or <br>
<!-- - <a href="https://docs.docker.com/get-docker/" target="_blank"> Docker </a> -->

### Add a new protocol 🚀

<h3>0. Make sure you have Node installed </h3>

```bash
node -v
```

<br />
<h3>1. Fork this repository </h3>

Click on the "Fork" button on the top right-hand corner of your screen.

<br />
<h3>2. Run "npm install" to install all the dependencies </h3>

```bash
npm install
```

<br />
<h3>3. Create a new folder in the folder SRC/CONNECTORS with your PROTOCOL_NAME and a folder with PRODUCT/VERSION of this integration </h3>

```bash
npm run create-connector -- --connector="protocol_name/product_version"
```

Your connector folder must respect the following structure to pass tests:

```bash
├── connectors
│ ├── name_of_your_protocol
│ │ ├── product_version_1
│ │ │  ├── abi
│ │ │  │  ├── Pool.json
│ │ │  │  ├── LP.json
│ │ │  ├── analytics
│ │ │  │  ├── index.js/ts
│ │ │  ├── interactions
│ │ │  │  ├── index.js/ts
│ │ │  ├── pools
│ │ │  │  ├── pools.js/ts
```

<br />
<h3>4. Develop your integration using JS or TS </h3>

🚨 Make sure your pools.js, analytics/index.js and interactions/index.js respect the expected EXPORT 🚨

🤞 Check in the `src/connectors` of the staging branch to check examples or read the INTERFACE section below

<h3>5. Make sure your integration works by running the TEST suites. </h3>

Test only your repository structure with:

```bash
npm run test-repository -- --connector="protocol_name/product_version"
```

Test only your analytics integration with:

```bash
npm run test-analytics -- --connector="protocol_name/product_version"
```

Test only your interaction integration with:

```bash
npm run test-interactions -- --connector="protocol_name/product_version"
```

Use the following command to run all the tests at once:

```bash
npm run full-test -- --connector="protocol_name/product_version"
```

🚨 If you have too many pools to test, you can make sure that your integration is working on a specific pool by using:

```bash
npm run full-test -- --connector="protocol_name/product_version" --pool="pool_address"
```

<br />
<h3> 6. Make your integration live by submitting a PR to the STAGING branch 🎉🎉🎉 </h3>

Keep in mind to "compare across forks" in the [pull request creation page](https://github.com/Valha-xyz/valha-defi-connectors/compare) to make your fork appears.

🚨🚨🚨 Make sure the TITLE of your PR is your "protocol_name/product_version" to pass CI/CD 🚨🚨🚨

<br />
<h3>7. Now, just enjoy as you make DeFi easier for everyone 🍹🍹🍹 </h3>

<br />

## Interface

<h3>Expected EXPORT for pools.js </h3>

```typescript
interface Pool {
  name: string; // Name of the pool.
  chain: string; // Chain on which the pool exists.
  underlying_tokens: string[]; // Addresses of the Tokens that are accepted by the pool.
  pool_address: string; // Address to track an one's shares of the pool.
  investing_address: string; // Address to use in order to deposit/redeem into the pool.
  staking_address: string; // Address to use in order to stake/unstake to the pool.
  boosting_address: string; // Address to use in order to boost/unboost one's positions the pool.
  distributor_address: string; // Address to use in order to claim its rewards from the pool.
  rewards_tokens: string; // Addresses of the Tokens that are use as rewards by the pool.
  metadata: any; // Undefined object in order to pass pool-specific information for analytics or interactions purposes.
}
```

<br />
<h3>Expected EXPORT for analytics/index.js </h3>

```typescript
interface Analytics {
  status: bool | null; // Current status of the pool. Boolean that specify if a pool is open (true) or closed (false).
  tvl: number | null; // TVL value in USD. Value that is invested in the pool (whatever the current use).
  liquidity: number | null; // Liquidity value in USD. Value that is available to withdraw from the pool.
  outloans: number | null; // Outloans value in USD. Value that is currently used by users of the protocols.
  losses: number | null; // Losses value in USD. Value that is currently lost by the protocol (credit default, slashing events, bad debt, etc...).
  capacity: number | null; // Capacity value in USD. Value that the pool can take.
  apy: number | null; // Rate you can earn on an account over a year by putting money into the pool. Sum of Activity APY + Rewards APY.
  activity_apy: number | null; // Rate you can earn on an account over a year by putting money into the pool coming from economics of the protocol.
  rewards_apy: number | null; // Rate you can earn on an account over a year by putting money into the pool coming from incentives of the protocol (liquidity mining).
  boosting_apy: number | null; // Rate you can earn on an account over a year by putting money into the pool coming from specific action in the protocol.
  share_price: number | null; // Price to get one share of the pool in USD. Value that must be deposited in the pool to get 1 pool token.
  minimum_deposit: number | null; // Minimum deposit in USD. Minimum amount that must be sent in one deposit transaction.
  maximum_deposit: number | null; // Maximum deposit in USD. Maximum amount that must be sent in one deposit transaction.
}
```

<br />
<h3>Expected EXPORT for interactions/index.js </h3>

```typescript
interface Interactions {
  deposit: deposit() | null; // Action to put asset in a pool.
  deposit_and_stake: deposit_and_stake() | null; // Action to put asset in a pool and let the protocol use this asset for a its specific use case.
  unlock: unlock() | null; // Action to unlock asset from a pool.
  redeem: redeem() | null; // Action to remove asset from a pool.
  stake: stake() | null; // Action to let the protocol use an asset for a defined use case.
  unstake: unstake() | null; // Action to stop the protocol from using an asset for a defined use case.
  boost: boost() | null; // Action to take part into protocol-specific mechanisms to earn extra yield.
  unboost: unboost() | null; // Action to stop taking part into protocol-specific mechanisms to earn extra yield.
  claim_rewards: claimRewards() | null; // Action to claim the rewards generated by staking your assets.
  claim_interests: claimInterests() | null; // Action to claim the interests generated by participating in the pool.
}
```

<h3>Expected Return Object for interactions/index.js FUNCTION </h3>

```typescript
interface InteractionsReturnObject {
  abi: EVMAbi; // JSON file that represent a contract ABI
  method_name: string; // method to interact with the pool
  position_token: string; // token needed to approve
  position_token_type: 'ERC-20' | 'ERC-721' | 'CUSTOM'; // token type to approve
  interaction_address: string; // contract to interact with to interact with poolAddress
  amount: string; // amount that will be use in the ERC20 approve tx of the position token if it is an ERC20 or that will be use as the 'value' of the transaction
  args: string[]; // arguments to pass to the smart contracts to trigger 'method_name'
}
```

<br />

<h3> Swap protocol functions </h3>

In order to integrate swap protocols, you need to add a `<protocol>/analytics/liquidity-pool/getQuotePrice.ts` file (e.g. [src/connectors/0x/v0/analytics.liquidity-pool.getQuotePrice.ts](src/connectors/0x/v0/analytics.liquidity-pool.getQuotePrice.ts)).

This file should have one export : a `getQuotePrice` function. Its parameters are : 
```typescript
  tokenIn: string, // The address of the token the user wishes to swap from 
  amount: BigNumberish, // The amount of tokens (in base units, e.g. 1000000000000000000 for 1 Eth)
  tokenOut: string, // The token the user wishes to swap to
  chain: string // The chain on which the swap should take place (e.g. ethereum or optimism)
```
It should return the amount (in base units) of tokenOut a user should expect in the swap operation with the protocol.


<h3> Liquidity pools entry related functions</h3>

There are 2 ways of integrating a liquidity pool related protocol.
1. This solution should be used if a user should enter the pool with equalty weighted tokens. For instance, in order to enter a uniswap v2 pool, a user should deposit token0 and token1 with a 50/50 ratio. This choice should only be made if the minimumAmounts computed are in token units (e.g. uniswap) and not LP units (this integration doesn't suit curve for instance)

  In order to do that, a protocol, needs to add a `<protocol>/analytics/liquidity-pool/getPoolExchangeRate.ts` file (e.g. [src/connectors/uniswap/v2/analytics/liquidity-pool/getPoolExchangeRate.ts](src/connectors/uniswap/v2/analytics/liquidity-pool/getPoolExchangeRate.ts)).

    This file should have one export : a `getExchangeRate`functions with the following parameters : 

    ```typescript
    amount1: BigNumber, // an amount int token1 base units
    token1: string, 
    token2: string,
    pool: Pool // The pool object as defined in src/utils/types/connector-types
    ```

    This function should return the amount of token2 in base units that is equivalent to amount1 of token1 according to the pool.
    In the case of a pool with only 2 base assets, one call to this function allows one to know how much token2 should be deposited along amount1 of token1.
    In the general case of a pool with n base assets, (n-1) calls are needed to know how to enter the pool efficiently.


2. If the protocol doesn't require to enter with equal amounts of tokens, they also can implement a `getMinimumDeposit` function (e.g. [src/connectors/curve/v2/analytics/liquidity-pool/getMinimumDeposit.ts](src/connectors/curve/v2/analytics/liquidity-pool/getMinimumDeposit.ts)).

  This function has the following parameters
  ```typescript
  amount1: BigNumber, // amount of tokens you want to enter the pool with
  token1: string, // Token OF THE POOL that you will actually enter with
  pool: Pool // The pool object as defined in src/utils/types/connector-types
  ```

  This function should return the minimum amount of LPs one can get by entering the pool with amount1 token1. 
  In the background, in order to get the best entry into the pool, the result of this function will be maximised with respect to token1.

<h3> Liquidity pools exit related functions</h3>

In order for users to know how much they can get from exiting the liquidity pool, protocols should implement the [src/connectors/uniswap/v2/analytics/liquidity-pool/getMinimumRedeem.ts](src/connectors/uniswap/v2/analytics/liquidity-pool/getMinimumRedeem.ts) function.
```typescript
  amount: BigNumberish,
  pool: Pool
```
This function should return the amount of tokens expected when exiting the liquidity pool with amount LP tokens (in the LP token base units). It returns a list ordered the same way as the underlying tokens in the pool object


## ERC4626 Example

Let's consider that we are creating the connector for the v5 of the Valha protocol that call "valha/v5", we would run the following script to create the repositories:

```bash
npm run create-connector -- --connector="valha/v5"
```

### ABI - Example

We would add the ERC4626 ABI to a file name "erc4626.json" in the "valha/v5/abi/erc4626.json' repository.

### Analytics - Example

```javascript
/*
    DOCUMENTATION EXAMPLE to give more context about the integration work.

    Definitely need more testing and improvement.

    --> A CLI script will be developed to automatically generate ERC4626 connector
*/

const ERC4626ABI = require('../abi/ERC4626.json');
const { getNodeProvider } = require('src/utils/getNodeProvider');
const ethers = require('ethers');

async function getStatus(chain, pool_address) {
  return true;
}

async function getAPY(chain, pool_address) {
  const activity_apy = 2.5;
  const rewards_apy = 2.5;
  return { activity_apy: activity_apy, rewards_apy: rewards_apy };
}

async function getTotalAssets(POOL) {
  const decimals = await POOL.decimals();
  const TotalAssets = await POOL.totalAssets();
  return TotalAssets / 10 ** decimals;
}

async function getSharePrice(POOL) {
  const TotalAssets = await POOL.totalAssets();
  const TotalSupply = await POOL.totalSupply();
  return TotalAssets / TotalSupply;
}

async function analytics(chain, poolAddress) {
  const provider = getNodeProvider(chain);
  if (!provider) throw new Error('No provider was found.');
  const POOL = new ethers.Contract(poolAddress, ERC4626ABI, provider);
  const TVL = await getTotalAssets(POOL);
  const status = await getStatus(POOL);
  const { activity_apy, rewards_apy } = await getAPY(chain, poolAddress);
  const sharePrice = await getSharePrice(chain, poolAddress);

  const result = {
    status: status,
    tvl: TVL,
    liquidity: TVL,
    outloans: null,
    losses: null,
    capacity: 10_000_000,
    apy: activity_apy + rewards_apy,
    activity_apy: activity_apy,
    rewards_apy: rewards_apy,
    boosting_apy: 0,
    share_price: sharePrice,
    minimum_deposit: null,
    maximum_deposit: null,
  };

  return result;
}

module.exports = {
  main: analytics,
  url: 'https://app.test.xyz',
};
```

### Interactions - Example

```javascript
/* 
    DOCUMENTATION EXAMPLE to give more context about the integration work.
    
    Definitely need more testing and improvement.

    --> A CLI script will be developed to automatically generate ERC4626 connector
*/
const ERC4626ABI = require('../abi/ERC4626.json');

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
  const abi = ERC4626ABI;
  const method_name = 'deposit';
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN, receiverAddress];
  const interaction_address = investing_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
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
  const abi = ERC4626ABI;
  const method_name = 'redeem';
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN, receiverAddress, userAddress];
  const interaction_address = investing_address;

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: pool_address, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: interaction_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

module.exports = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  stake: null,
  unstake: null,
  boost: null,
  unboost: null,
  claim_rewards: null,
  claim_interests: null,
};
```

## Advice

### Analytics 🔍

Try to always get information from the chain, not from an API. It will increase confidence in your protocol and simplify understanding for analysts.

### Interactions 🏎️

Try to get the interactions functions fast. It will improve the performance of apps using them.

## Contributing 🤝🤝🤝

We often list improvement issues that anyone can work on, so feel free to check the [issues](https://github.com/Valha-xyz/valha-defi-connectors/issues) if you don't know where to start.

Feel free to reach out in the [#developers channel](https://discord.gg/juKsubzTeU) of our Discord Server if you need any help!

## Acknowledgements 📚📚📚

<div>
  Valha's connectors and development philosophy are heavily inspired by the impressive work done by the <a href="https://defillama.com/" target="_blank"> DefiLlama </a> team, its community and the way the product has developed.
  <br/>
  <br/>
  We believe that open and collaborative contribution is one of the greatest catalysts for composability in decentralised finance. There are many ways to make the DeFi ecosystem more transparent, understandable and operable. We hope to make Valha part of this mission.
</div>

## Support

Reach out to the team at one of the following places:

- Create an [issue](https://github.com/Valha-xyz/valha-defi-connectors/issues/new?assignees=&labels=enhancement&title=support%3A+)
- Contact [Octavio](https://twitter.com/OctavioNotPunk)
- Ask information on our [Discord](https://discord.gg/juKsubzTeU)

## Project assistance

If you want to say **thank you** or/and support active development of Valha:

- Tweet about Valha
- Write interesting articles about the project on [Medium](https://medium.com/) or [Mirror](https://mirror.xyz/)
- Add a [GitHub Star](https://github.com/Valha-xyz/valha-defi-connectors) to the project.
- [DM Octavio](https://twitter.com/OctavioNotPunk) to give your feedback
- [Request](https://github.com/Valha-xyz/valha-defi-connectors/issues/new?assignees=&labels=enhancement&title=feature%3A+) a new feature so we better answer your needs

<br />
Together, we can make DeFi easier!

Valha is still a work in progress, please do not hesitate to provide feedbacks.
