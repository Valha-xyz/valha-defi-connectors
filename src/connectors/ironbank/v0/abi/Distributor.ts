export const DistributorABI = [
  {
    inputs: [
      { internalType: 'address', name: '_factory', type: 'address' },
      { internalType: 'address', name: '_wrappedNative', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokenSeized',
    type: 'event',
  },
  {
    inputs: [],
    name: 'claimAllRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'stakingRewards', type: 'address[]' },
    ],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'stakingRewards', type: 'address[]' },
      { internalType: 'bool', name: 'toNative', type: 'bool' },
    ],
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: 'toNative', type: 'bool' }],
    name: 'exitAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'contract StakingRewardsFactoryInterface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'rewardToken', type: 'address' }],
    name: 'getRewardTokenInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'rewardTokenAddress',
            type: 'address',
          },
          { internalType: 'string', name: 'rewardTokenSymbol', type: 'string' },
          { internalType: 'uint8', name: 'rewardTokenDecimals', type: 'uint8' },
        ],
        internalType: 'struct StakingRewardsHelper.RewardTokenInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStakingInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingTokenAddress',
            type: 'address',
          },
          { internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'supplyRatePerBlock',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'exchangeRate', type: 'uint256' },
          {
            components: [
              {
                internalType: 'address',
                name: 'rewardTokenAddress',
                type: 'address',
              },
              { internalType: 'uint256', name: 'rate', type: 'uint256' },
            ],
            internalType: 'struct StakingRewardsHelper.RewardRate[]',
            name: 'rewardRates',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct StakingRewardsHelper.StakingInfo[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'address[]', name: 'rewardTokens', type: 'address[]' },
    ],
    name: 'getUserClaimableRewards',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'rewardTokenAddress',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'rewardTokenSymbol',
                type: 'string',
              },
              {
                internalType: 'uint8',
                name: 'rewardTokenDecimals',
                type: 'uint8',
              },
            ],
            internalType: 'struct StakingRewardsHelper.RewardTokenInfo',
            name: 'rewardToken',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        internalType: 'struct StakingRewardsHelper.RewardClaimable[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getUserStaked',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingTokenAddress',
            type: 'address',
          },
          { internalType: 'uint256', name: 'balance', type: 'uint256' },
        ],
        internalType: 'struct StakingRewardsHelper.UserStaked[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'seize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'underlying', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakeNative',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'stakingRewards', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'toNative', type: 'bool' },
    ],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wrappedNative',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
